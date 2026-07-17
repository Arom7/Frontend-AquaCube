import { useEffect, useState } from "react";
import { listSocios } from "../services";

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
    const [socios, setSocios] = useState([]);

    useEffect(() => {
        const loadSocios = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await listSocios();
                setSocios(response);
            } catch (err) {
                setError(err?.message || "No fue posible cargar socios.");
            } finally {
                setLoading(false);
            }
        };

        loadSocios();
    }, []);

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-900">Socios</h2>
            <p className="mt-2 text-sm text-slate-600">
                Modulo de visualizacion de socios.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                {loading && <p className="text-sm text-slate-700">Cargando socios...</p>}
                {!loading && error && <p className="text-sm text-red-600">Error: {error}</p>}
                {!loading && !error && socios.length === 0 && (
                    <p className="text-sm text-slate-700">No se encontraron socios.</p>
                )}

                {!loading && !error && socios.length > 0 && (
                    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                        <table className="min-w-[760px] w-full border-collapse text-sm">
                            <caption className="sr-only">Tabla de socios registrados</caption>

                            <thead className="bg-slate-100 text-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Nombre Completo</th>
                                    <th className="px-4 py-3 text-left font-semibold">Carnet Identidad</th>
                                    <th className="px-4 py-3 text-left font-semibold">Telefonos</th>
                                    <th className="px-4 py-3 text-left font-semibold">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {socios.map((socio) => {
                                    const phoneList = getPhoneList(socio.telefonos);

                                    return (
                                        <tr key={socio.id} className="border-t border-slate-200 even:bg-slate-50/60">
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
                                            <td className="px-4 py-3">
                                                <button className="rounded-xl bg-brand-secondary px-3 py-2 text-xs font-semibold text-white transition hover:brightness-110">
                                                    Ver Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}
