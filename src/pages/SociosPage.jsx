import { useEffect, useState } from "react";
import { SocioCreateModal } from "../components/SocioCreateModal";
import { SocioDetailsModal } from "../components/SocioDetailsModal";
import { SociosFilters } from "../components/SociosFilters";
import { Pagination } from "../components/Pagination";
import { createSocio, listSociosPaginated, getSocioById } from "../services";
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [socios, setSocios] = useState([]);
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const [selectedSocio, setSelectedSocio] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activo, setActivo] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ currentPage: 1, lastPage: 1, total: 0 });

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activo]);

  const loadSocios = async () => {
    try {
      setLoading(true);
      setError("");
      const params = {
        page,
        per_page: PER_PAGE,
        ...(debouncedSearch ? { search: debouncedSearch } : {}),
        ...(activo ? { activo } : {}),
      };
      const { items, meta: responseMeta } = await listSociosPaginated(params);
      setSocios(items);
      setMeta(responseMeta);
    } catch (err) {
      setError(err?.message || "No fue posible cargar socios.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSocios();
  }, [page, debouncedSearch, activo]);

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
      await loadSocios();
    } catch (err) {
      setSubmitError(err?.message || "No fue posible registrar el socio.");
    } finally {
      setSaving(false);
    }
  };

  const handleShowDetails = async (socio) => {
    const fullSocio = await getSocioById(socio.id);
    console.log("Full socio details:", fullSocio.data);
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

        {submitError && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {submitError}
          </p>
        )}

        <div className="mt-6">
          <SociosFilters
            search={search}
            onSearchChange={setSearch}
            activo={activo}
            onActivoChange={setActivo}
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
                        <button className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                          onClick={() => handleShowDetails(socio)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {/* Boton de edicion de datos para socio */}  
                        <button className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
                          onClick={() => handleEditSocio(socio)}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        {/* Boton de eliminacion de datos para socio */}  
                        <button className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110"
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
    </>
  );
}
