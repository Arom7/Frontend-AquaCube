import { useEffect, useState } from "react";
import { Home, X, PcCase, Gauge } from "lucide-react";
import { MedidorCreateField } from "./MedidorCreateModal/MedidorCreateField";
import {
    initialForm,
    validateMedidorForm,
} from "./MedidorCreateModal/validation";
import { listPropiedades } from "../services";

function getPropiedadLabel(propiedadId) {
    const propiedad = listPropiedades().find((p) => p.id === propiedadId);
    return propiedad ? propiedad.label : "";
}

export function MedidorCreateModal({ isOpen, onClose, onSubmit, submitting }) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [propiedades, setPropiedades] = useState([]);

    useEffect(() => {
        if (!isOpen) {
            setForm(initialForm);
            setErrors({});
            return;
        }

        listPropiedades()
            .then(setPropiedades)
            .catch(() => setPropiedades([]));
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => {
            if (name === "medidor_nuevo") {
                // Un medidor nuevo siempre arranca en 0; uno usado requiere la lectura actual.
                return { ...prev, medidor_nuevo: value, medida_inicial: value ? "0" : "" };
            }
            return { ...prev, [name]: value };
        });
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateMedidorForm(form);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(form);
    };

    if (!isOpen) return null;

    const propiedadesOptions = propiedades.map((propiedad) => ({
        value: String(propiedad.id),
        label: propiedad.code ?? propiedad.direccion ?? `Propiedad ${propiedad.id}`,
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
                                Registrar un nuevo medidor
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">
                                Completa la informacion para crear un nuevo medidor.
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
                    id="medidor-create-form"
                    onSubmit={handleSubmit}
                    className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
                >
                    <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <PcCase className="h-4 w-4 text-brand-secondary" />
                            <h4 className="text-sm font-semibold text-slate-800">
                                Caracteristicas del medidor
                            </h4>
                        </div>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <MedidorCreateField
                                id="code"
                                name="code"
                                type="text"
                                label="Codigo de medidor"
                                value={form.code}
                                onChange={handleChange}
                                placeholder="Ej. 1341"
                                error={errors.code}
                            />

                            <MedidorCreateField
                                id="propiedad_id"
                                name="propiedad_id"
                                label="Codigo de propiedad"
                                type="select"
                                value={form.propiedad_id}
                                onChange={handleChange}
                                placeholder="Seleccione una propiedad"
                                options={propiedadesOptions}
                                error={errors.propiedad_id}
                            />
                        </div>
                    </section>

                    <section className="rounded-2xl border border-slate-200 bg-white p-4">
                        <div className="mb-3 flex items-center gap-2">
                            <Gauge className="h-4 w-4 text-brand-secondary" />
                            <h4 className="text-sm font-semibold text-slate-800">Estado inicial</h4>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-slate-700">Es un medidor nuevo</p>
                                <p className="text-xs text-slate-500">Activa esta opcion si el medidor es nuevo.</p>
                            </div>
                            <MedidorCreateField
                                id="medidor_nuevo"
                                name="medidor_nuevo"
                                type="switch"
                                value={form.medidor_nuevo}
                                onChange={handleChange}
                                error={errors.medidor_nuevo}
                            />
                        </div>

                        <div className="mt-3">
                            <MedidorCreateField
                                id="medida_inicial"
                                name="medida_inicial"
                                label="Medida inicial"
                                placeholder="Ej. 100, 130, 2320..."
                                value={form.medida_inicial}
                                disabled={form.medidor_nuevo}
                                onChange={handleChange}
                                error={errors.medida_inicial}
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
                        form="medidor-create-form"
                        className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={submitting}
                    >
                        {submitting ? "Guardando..." : "Guardar medidor"}
                    </button>
                </div>
            </div>
        </div>
    );
}
