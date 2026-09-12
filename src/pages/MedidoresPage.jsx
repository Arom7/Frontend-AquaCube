import { useState } from "react";
import { listMedidoresPaginated, createMedidor } from "../services";
import { usePaginatedResource } from "../hooks/usePaginatedResource";
import { MedidorCreateModal } from "../components/MedidorCreateModal";
import { ListFilters } from "../components/common/ListFilters";
import { Eye, Pencil, Trash } from "lucide-react";
import { Pagination } from "../components/common/Pagination";
import { AlertModal } from "../components/common/AlertModal";

const PER_PAGE = 10;

export function MedidoresPage() {
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    items: medidores,
    meta,
    loading,
    error,
    setPage,
    search,
    setSearch,
    reload: loadMedidores,
  } = usePaginatedResource({
    fetchPage: listMedidoresPaginated,
    perPage: PER_PAGE,
    initialFilters: { activo: "" },
  });

  const handleCreateMedidor = async (form) => {
    setSaving(true);
    setSubmitError("");

    const payload = {
      ...form,
    };

    try {
      await createMedidor(payload);
      setIsModalOpen(false);
      setSuccessMessage("Medidor creado exitosamente");
      await loadMedidores();
    } catch (error) {
      setSubmitError(error.message || "Error en el registro del medidor");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-slate-900">Medidores</h2>
            <p className="mt-2 text-sm text-slate-600">
              Espacio para administrar inventario de medidores y su asignacion.
            </p>
          </div>
          <button
            className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            onClick={() => setIsModalOpen(true)}
          >
            Registrar un nuevo medidor
          </button>
        </div>

        {submitError && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <div className="mt-6">
          <ListFilters
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por codigo, direccion o titular..."
          />
        </div>

        <div className="mt-6 rounded-2xl border border border-slate-200 bg-slate-50 p-5">
          {loading && (
            <p className="text-sm text-slate-700">Cargando medidores...</p>
          )}
          {!loading && error && (
            <p className="text-sm text-red-600">Error: {error}</p>
          )}
          {!loading && !error && medidores.length === 0 && (
            <p className="text-sm text-slate-700">
              No se encontraron medidores.
            </p>
          )}

          {!loading && !error && medidores.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-[760px] w-full border-collapse text-sm">
                <caption className="sr-only">
                  Tabla de propiedades registradas
                </caption>

                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-center font-semibold">
                      Codigo del medidor
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Medida actual
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Codigo de propiedad
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Fecha de retiro
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {medidores.map((medidor) => {
                    return (
                      <tr key={medidor.id}>
                        <td className="px-4 py-3 text-center">
                          {medidor.code}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {medidor.medida_actual}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {medidor.propiedad.code}
                        </td>
                        <td className="px-4 py-3 text-left">
                          {medidor.propiedad.fecha_retiro}
                        </td>
                        <td className="px-4 py-3 gap-1 flex justify-center">
                          <button
                            className="rounded-xl bg-white border border-brand-secondary px-3 py-2 text-xs font-semibold text-brand-secondary transition hover:bg-brand-secondary hover:text-white"
                            onClick={() => handleShowDetails(medidor)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-xl bg-white border border-sky-500 px-3 py-2 text-xs font-semibold text-sky-500 transition hover:bg-blue-500 hover:text-white"
                            onClick={() => handleEditPropiedad(medidor)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            className="rounded-xl bg-white border border-red-600 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                            onClick={() => handleDeletePropiedad(medidor)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && (
            <Pagination
              currentPage={meta.currentPage}
              lastPage={meta.lastPage}
              total={meta.total}
              onPageChange={setPage}
              itemLabel="medidores"
            />
          )}
        </div>
      </section>

      <MedidorCreateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMedidor}
        submitting={saving}
      />

      <AlertModal
        isOpen={Boolean(successMessage)}
        type="success"
        message={successMessage}
        onClose={() => setSuccessMessage("")}
        autoCloseMs={3000}
      />

      <AlertModal
        isOpen={Boolean(submitError)}
        type="error"
        message={submitError}
        onClose={() => setSubmitError("")}
      />
    </>
  );
}
