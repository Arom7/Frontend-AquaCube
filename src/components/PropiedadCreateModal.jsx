import { useEffect, useState } from "react";
import { Calendar, Home, MapPin, Wallet, X } from "lucide-react";
import { PropiedadCreateField } from "../components/PropiedadCreateModal/PropiedadCreateField";
import { listSocios } from "../services";
import {
    INITIAL_FORM,
    validatePropiedadForm,
} from "./PropiedadCreateModal/validation";

function getSocioLabel(socio) {
    if (socio.nombre_completo) return socio.nombre_completo;
    return [socio.nombre, socio.apellido_paterno, socio.apellido_materno]
        .filter(Boolean)
        .join(" ");
}

export function PropiedadCreateModal({
    isOpen,
    onClose,
    onSubmit,
    submitting,
}) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [socios, setSocios] = useState([]);

    useEffect(() => {
        if (!isOpen) {
            setForm(INITIAL_FORM);
            setErrors({});
            return;
        }

        listSocios()
            .then(setSocios)
            .catch(() => setSocios([]));
    }, [isOpen]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "is_lote" && value ? { fecha_conexion: "" } : {}),
        }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validatePropiedadForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(form);
    };

    if (!isOpen) return null;

    const socioOptions = socios.map((socio) => ({
        value: String(socio.id),
        label: getSocioLabel(socio),
    }));

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
            <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-brand-secondary/10 to-transparent px-6 py-5">
                    <div className="flex items-start gap-3">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand-secondary/15 text-brand-secondary">
                            <Home className="h-5 w-5" />
                        </span>
                        <div>
                            <h3 className="text-xl font-semibold text-slate-900">
                                Registrar una nueva propiedad
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Completa la informacion para crear una nueva propiedad.
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-none rounded-lg border border-slate-300 p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                        disabled={submitting}
                        aria-label="Cerrar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <form
                    id="propiedad-create-form"
                    onSubmit={handleSubmit}
                    className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
                >
                    <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-brand-secondary" />
                            <h4 className="text-sm font-semibold text-slate-800">
                                Identificacion y ubicacion
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <PropiedadCreateField
                                id="code"
                                name="code"
                                label="Codigo"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="Ej. A123"
                                error={errors.code}
                            />

                            <PropiedadCreateField
                                id="socio"
                                name="socio"
                                label="Socio"
                                type="select"
                                value={form.socio}
                                onChange={handleChange}
                                placeholder="Selecciona un socio"
                                options={socioOptions}
                                error={errors.socio}
                            />

                            <PropiedadCreateField
                                id="direccion"
                                name="direccion"
                                label="Direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                placeholder="Ej. Av. Blanco Galindo Km 5, Acera Oeste"
                                error={errors.direccion}
                                className="sm:col-span-2"
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <Wallet className="h-4 w-4 text-brand-secondary" />
                            <h4 className="text-sm font-semibold text-slate-800">
                                Conexion y costos
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <PropiedadCreateField
                                id="precio_conexion"
                                name="precio_conexion"
                                label="Precio Conexion"
                                value={form.precio_conexion}
                                onChange={handleChange}
                                placeholder="Ej. 100"
                                error={errors.precio_conexion}
                            />

                            <PropiedadCreateField
                                id="fecha_conexion"
                                name="fecha_conexion"
                                label="Fecha de conexion"
                                type="date"
                                value={form.fecha_conexion}
                                onChange={handleChange}
                                error={errors.fecha_conexion}
                                optional
                                disabled={form.is_lote}
                            />
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
                            <div className="flex items-start gap-2">
                                <Calendar className="mt-0.5 h-4 w-4 flex-none text-slate-400" />
                                <div>
                                    <p className="text-sm font-medium text-slate-700">Es un lote</p>
                                    <p className="text-xs text-slate-500">
                                        Activa esta opcion si la propiedad no cuenta con fecha de conexion.
                                    </p>
                                </div>
                            </div>
                            <PropiedadCreateField
                                id="is_lote"
                                name="is_lote"
                                type="switch"
                                value={form.is_lote}
                                onChange={handleChange}
                                error={errors.is_lote}
                                className="flex-none"
                            />
                        </div>
                    </section>
                </form>

                <div className="flex items-center justify-end gap-2 border-t border-slate-100 bg-white px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                        disabled={submitting}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="propiedad-create-form"
                        className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={submitting}
                    >
                        {submitting ? "Guardando..." : "Guardar propiedad"}
                    </button>
                </div>
            </div>
        </div>
    );
}
