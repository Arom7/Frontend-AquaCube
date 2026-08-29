import { API_BASE_URL } from "../services/http/client";

function getInitials(name) {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((part) => part[0]?.toUpperCase()).join("");
}

export function SocioDetailsModal({ isOpen, onClose, socio }) {
    if (!isOpen || !socio) return null;

    const imageSrc = socio.image_url
        ? `${API_BASE_URL}${socio.image_url}`
        : null;
    const telefonos = socio.telefonos?.map((t) => t.telefono) || [];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
            <div className="w-full max-w-md overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">Detalles del socio</h3>
                        <p className="mt-0.5 text-sm text-slate-500">Información registrada del socio.</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 transition hover:bg-slate-100"
                    >
                        Cerrar
                    </button>
                </div>

                <div className="flex flex-col items-center gap-3 px-6 pb-2 pt-6">
                    {imageSrc ? (
                        <img
                            src={imageSrc}
                            alt={`Fotografía de ${socio.nombre}`}
                            className="h-28 w-28 rounded-full border-4 border-slate-100 object-cover shadow-sm"
                        />
                    ) : (
                        <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-slate-100 bg-slate-200 text-2xl font-semibold text-slate-500 shadow-sm">
                            {getInitials(socio.nombre)}
                        </div>
                    )}
                    <div className="text-center">
                        <p className="text-lg font-semibold text-slate-900">{socio.nombre + " " + socio.apellidos || "Sin nombre"}</p>
                        <p className="text-sm text-slate-500">C.I. {socio.carnet_identidad || "No disponible"}</p>
                    </div>
                </div>

                <div className="space-y-3 px-6 pb-6 pt-4">
                    <div className="rounded-2xl bg-slate-50 p-4">
                        <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Teléfonos</h4>
                        {telefonos.length > 0 ? (
                            <ul className="mt-2 space-y-1">
                                {telefonos.map((telefono, index) => (
                                    <li key={`${socio.id}-tel-${index}`} className="text-sm font-medium text-slate-800">
                                        {telefono}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-sm text-slate-500">No disponible</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}


