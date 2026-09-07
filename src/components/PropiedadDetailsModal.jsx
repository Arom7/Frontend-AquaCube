import { useEffect, useState } from "react";
import { API_BASE_URL, getPropiedadById } from "../services";

// El backend expone las imagenes via /storage, fuera del prefijo /api de la base URL.
const STORAGE_BASE_URL = API_BASE_URL.replace(/\/api(\/v\d+)?$/i, "");

function formatFecha(fecha) {
    if (!fecha) return "No disponible";
    const date = new Date(fecha);
    if (Number.isNaN(date.getTime())) return fecha;
    return date.toLocaleDateString("es-BO", { year: "numeric", month: "long", day: "numeric" });
}

function formatMonto(monto) {
    const value = Number(monto);
    if (Number.isNaN(value)) return monto ?? "0.00";
    return `Bs. ${value.toFixed(2)}`;
}

export function PropiedadDetailsModal({ isOpen, onClose, propiedad }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [detalle, setDetalle] = useState(null);

    useEffect(() => {
        if (!isOpen || !propiedad?.code) return;

        let ignore = false;
        const loadDetalle = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await getPropiedadById(propiedad.code);
                if (!ignore) setDetalle(response?.data || null);
            } catch (err) {
                if (!ignore) setError(err?.message || "No fue posible cargar los datos de la propiedad.");
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        loadDetalle();

        return () => {
            ignore = true;
        };
    }, [isOpen, propiedad?.code]);

    useEffect(() => {
        if (!isOpen) {
            setDetalle(null);
            setError("");
        }
    }, [isOpen]);

    if (!isOpen || !propiedad) return null;

    const imageSrc = detalle?.imagen_propiedad
        ? `${STORAGE_BASE_URL}/storage/${detalle.imagen_propiedad}`
        : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">Detalles de la propiedad</h3>
                        <p className="mt-0.5 text-sm text-slate-500">Informacion registrada de la propiedad.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                        Cerrar
                    </button>
                </div>

                {loading && (
                    <p className="px-6 py-10 text-center text-sm text-slate-600">
                        Cargando datos de la propiedad...
                    </p>
                )}

                {!loading && error && (
                    <p className="px-6 py-10 text-center text-sm text-red-600">Error: {error}</p>
                )}

                {!loading && !error && detalle && (
                    <>
                        <div className="flex flex-col items-center gap-3 px-6 pb-2 pt-6">
                            {imageSrc ? (
                                <img
                                    src={imageSrc}
                                    alt={`Fotografía de la propiedad ${detalle.code}`}
                                    className="h-28 w-28 rounded-2xl border-4 border-slate-100 object-cover shadow-sm"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-2xl border-4 border-slate-100 bg-slate-200 text-2xl font-semibold text-slate-500 shadow-sm">
                                    {detalle.code || "?"}
                                </div>
                            )}
                            <div className="text-center">
                                <p className="text-lg font-semibold text-slate-900">{detalle.code}</p>
                                <p className="text-sm text-slate-500">{detalle.direccion || "Sin direccion"}</p>
                            </div>
                        </div>

                        <div className="space-y-3 px-6 pb-6 pt-4">
                            <div className="rounded-2xl bg-slate-50 p-4">
                                <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Propietario
                                </h4>
                                <p className="mt-2 text-sm font-medium text-slate-800">
                                    {detalle.nombre_completo_propietario || "No disponible"}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Total en multas
                                    </h4>
                                    <p className="mt-2 text-sm font-medium text-slate-800">
                                        {formatMonto(detalle.multas)}
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Fecha de conexion
                                    </h4>
                                    <p className="mt-2 text-sm font-medium text-slate-800">
                                        {formatFecha(detalle.fecha_conexion)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}


