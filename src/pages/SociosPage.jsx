import { useState } from "react";
import { SocioCreateModal } from "../components/SocioCreateModal";
import { SocioDetailsModal } from "../components/SocioDetailsModal";
import { ListFilters } from "../components/common/ListFilters";
import { Pagination } from "../components/common/Pagination";
import { AlertModal } from "../components/common/AlertModal";
import { createSocio, listSociosPaginated, getSocioById } from "../services";
import { usePaginatedResource } from "../hooks/usePaginatedResource";
import { Eye,  Pencil, Trash } from 'lucide-react';

const PER_PAGE = 10;

function getPhoneList(telefonos) {
  if (!Array.isArray(telefonos) || telefonos.length === 0) {
    return ["No disponible"];
  }

  return telefonos.map((item) => {
    if (typeof item === "string") return item;
    if (item?.telefono) return item.telefono;
    return "No disponible";
  });
}

export function SociosPage() {
  const [saving, setSaving] = useState(false);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    items: socios,
    meta,
    loading,
    error,
    page,
    setPage,
    search,
    setSearch,
    filters,
    setFilter,
    reload: loadSocios,
  } = usePaginatedResource({
    fetchPage: listSociosPaginated,
    perPage: PER_PAGE,
    initialFilters: { activo: "" },
  });

  const handleCreateSocio = async (form) => {
    try {
      setSaving(true);
      setSubmitError("");

      const payload = {
        socio: {
          nombre: form.nombre.trim(),
          primer_apellido : form.apellido_paterno.trim(),
          segundo_apellido: form.apellido_materno.trim(),
          carnet_identidad: form.carnet_identidad.trim(),
        },
        usuario: {
          email: form.email.trim(),
          password: form.contrasenia.trim(),
        },
        telefono: {
          code_ciudad: form.codigo_ciudad.trim(),
          telefono: form.telefono.trim(),
        },
        image: form.image || null,
      };

      await createSocio(payload);
      setIsModalOpen(false);
      setSuccessMessage("Socio registrado correctamente.");
      await loadSocios();
    } catch (err) {
      setSubmitError(err?.message || "No fue posible registrar el socio.");
    } finally {
      setSaving(false);
    }
  };

  const handleShowDetails = async (socio) => {
    const fullSocio = await getSocioById(socio.id);
    setSelectedSocio(fullSocio.data);
    setIsModalDetailsOpen(true);
  };

  return (
    <>
      <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="mt-2 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-slate-900">Socios</h2>
            <p className="mt-2 text-sm text-slate-600">
              Modulo de visualizacion de socios.
            </p>
          </div>
          <button
            className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
            onClick={() => setIsModalOpen(true)}
          >
            Registrar un nuevo socio
          </button>
        </div>

        <div className="mt-6">
          <ListFilters
            search={search}
            onSearchChange={setSearch}
            searchPlaceholder="Buscar por nombre, apellidos o carnet..."
            selects={[
              {
                id: "activo",
                label: "Estado",
                value: filters.activo,
                onChange: (value) => setFilter("activo", value),
                options: [
                  { value: "", label: "Todos" },
                  { value: "true", label: "Activos" },
                  { value: "false", label: "Inactivos" },
                ],
              },
            ]}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          {loading && (
            <p className="text-sm text-slate-700">Cargando socios...</p>
          )}
          {!loading && error && (
            <p className="text-sm text-red-600">Error: {error}</p>
          )}
          {!loading && !error && socios.length === 0 && (
            <p className="text-sm text-slate-700">No se encontraron socios.</p>
          )}

          {!loading && !error && socios.length > 0 && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <table className="min-w-[760px] w-full border-collapse text-sm">
                <caption className="sr-only">Tabla de socios registrados</caption>

              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">
                    Nombre Completo
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Carnet Identidad
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Telefonos
                  </th>
                  <th className="px-4 py-3 text-left font-semibold">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {socios.map((socio) => {
                  const phoneList = getPhoneList(socio.telefonos);

                  return (
                    <tr
                      key={socio.id}
                      className="border-t border-slate-200 even:bg-slate-50/60"
                    >
                      <td className="px-4 py-3 font-medium text-slate-900">
                        {socio.nombre_completo || "Sin nombre"}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {socio.carnet_identidad || "No disponible"}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        <ul className="space-y-1">
                          {phoneList.map((telefono, index) => (
                            <li key={`${socio.id}-tel-${index}`}>{telefono}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-3 gap-1 flex">
                        {/* Boton de visualizacion de detalles de socio */}   
                        <button className="rounded-xl bg-white border border-brand-secondary px-3 py-2 text-xs font-semibold text-brand-secondary transition hover:bg-brand-secondary hover:text-white"
                          onClick={() => handleShowDetails(socio)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {/* Boton de edicion de datos para socio */}  
                        <button className="rounded-xl bg-white border border-sky-500 px-3 py-2 text-xs font-semibold text-sky-500 transition hover:bg-blue-500 hover:text-white"
                          onClick={() => handleEditSocio(socio)}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* Boton de eliminacion de datos para socio */}  
                        <button className="rounded-xl bg-white border border-red-600 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                          onClick={() => handleDeleteSocio(socio)}
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
              itemLabel="socios"
            />
          )}
        </div>
      </section>
      <SocioCreateModal
        isOpen={isModalOpen}
        onClose={() => {
          if (!saving) {
            setIsModalOpen(false);
            setSubmitError("");
          }
        }}
        onSubmit={handleCreateSocio}
        submitting={saving}
      />

      <SocioDetailsModal
        isOpen={isModalDetailsOpen}
        onClose={() => setIsModalDetailsOpen(false)}
        socio={selectedSocio}
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
