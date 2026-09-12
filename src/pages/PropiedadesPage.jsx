import { useState } from "react";
import { listPropiedadesPaginated } from "../services";
import { PropiedadDetailsModal } from "../components/PropiedadDetailsModal";
import { Eye, Pencil, Trash } from "lucide-react";
import { PropiedadCreateModal } from "../components/PropiedadCreateModal";
import { createPropiedad } from "../services";
import { ListFilters } from "../components/common/ListFilters";
import { Pagination } from "../components/common/Pagination";
import { usePaginatedResource } from "../hooks/usePaginatedResource";
import { AlertModal } from "../components/common/AlertModal";

const PER_PAGE = 10;

export function PropiedadesPage() {
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [selectedPropiedad, setSelectedPropiedad] = useState(null);

  const {
    items: propiedades,
    meta,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    reload: loadPropiedades,
  } = usePaginatedResource({
    fetchPage: listPropiedadesPaginated,
    perPage: PER_PAGE,
  });

  const handleCreatePropiedad = async (form) => {
    try {
      setSaving(true);
      setSubmitError("");

      const payload = {
        code: form.code.trim(),
        direccion: form.direccion.trim(),
        is_lote: form.is_lote,
        total_multas: form.total_multas.trim(),
        precio_conexion: form.precio_conexion.trim(),
        fecha_conexion: form.is_lote ? null : form.fecha_conexion,
        socio_id: form.socio.trim()
      };

      await createPropiedad(payload);
      setIsModalOpen(false);
      setSuccessMessage("Propiedad registrada exitosamente.");
      await loadPropiedades();
    } catch (err) {
      setSubmitError(err?.message || "No fue posible registrar la propiedad.");
    } finally {
      setSaving(false);
    }
  };


  const handleShowDetails = (propiedad) => {
    setSelectedPropiedad(propiedad);
    setIsModalDetailsOpen(true);
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-900">Propiedades</h2>

        <div className="mt-2 flex items-center justify-between gap-4">
          <p className="mt-2 text-sm text-slate-600">
            Modulo de visualizacion de propiedades.
          </p>

          <button
            className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            onClick={() => setIsModalOpen(true)}
          >
            Registrar una nueva propiedad
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
            <p className="text-sm text-slate-700">Cargando propiedades...</p>
          )}
          {!loading && error && (
            <p className="text-sm text-red-600">Error: {error}</p>
          )}
          {!loading && !error && propiedades.length === 0 && (
            <p className="text-sm text-slate-700">
              No se encontraron propiedades.
            </p>
          )}

          {!loading && !error && propiedades.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-[760px] w-full border-collapse text-sm">
                <caption className="sr-only">
                  Tabla de propiedades registradas
                </caption>

                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-center font-semibold">
                      Codigo
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Direccion
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Total en Multas
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Titular
                    </th>
                    <th className="px-4 py-3 text-center font-semibold">
                      Acciones
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {propiedades.map((propiedad) => {
                    return (
                      <tr key={propiedad.id}>
                        <td className="px-4 py-3 text-center">
                          {propiedad.code}
                        </td>
                        <td className="px-4 py-3 text-left">
                          {propiedad.direccion}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {propiedad.total_multas}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {propiedad.nombre_socio}
                        </td>
                        <td className="px-4 py-3 gap-1 flex justify-center">
                          {/* Boton de visualizacion de detalles de propiedad */}
                          <button
                            className="rounded-xl bg-white border border-brand-secondary px-3 py-2 text-xs font-semibold text-brand-secondary transition hover:bg-brand-secondary hover:text-white"
                            onClick={() => handleShowDetails(propiedad)}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {/* Boton de edicion de datos para propiedad */}
                          <button
                            className="rounded-xl bg-white border border-sky-500 px-3 py-2 text-xs font-semibold text-sky-500 transition hover:bg-blue-500 hover:text-white"
                            onClick={() => handleEditPropiedad(propiedad)}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          {/* Boton de eliminacion de propiedad */}
                          <button
                            className="rounded-xl bg-white border border-red-600 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                            onClick={() => handleDeletePropiedad(propiedad)}
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
              itemLabel="propiedades"
            />
          )}
        </div>
      </section>

      <PropiedadCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!saving) {
            setIsModalOpen(false);
            setSubmitError("Ocurrio un error durante el registro de la nueva propiedad.");
          }
        }}
        onSubmit={handleCreatePropiedad}
        submitting={saving}
      />

      <PropiedadDetailsModal
        isOpen={isModalDetailsOpen}
        onClose={() => setIsModalDetailsOpen(false)}
        propiedad={selectedPropiedad}
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
