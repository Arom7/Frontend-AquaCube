import { useEffect, useState } from "react";
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
            <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-semibold text-slate-900">
                            Registrar una nueva propiedad
                        </h3>
                        <p className="mt-1 text-sm text-slate-600">
                            Completa la informacion para crear una nueva propiedad.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                        disabled={submitting}
                    >
                        Cerrar
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4 flex items-start justify-around gap-3">
                        <PropiedadCreateField
                            id="code"
                            name="code"
                            label="Codigo"
                            value={form.code}
                            onChange={handleChange}
                            placeholder="Ej. A123"
                            error={errors.code}
                            className="w-1/2"
                        />

                        <PropiedadCreateField
                            id="precio_conexion"
                            name="precio_conexion"
                            label="Precio Conexion"
                            value={form.precio_conexion}
                            onChange={handleChange}
                            placeholder="Ej. 100"
                            error={errors.precio_conexion}
                            className="w-1/2"
                        />
                    </div>

                    <div className="mb-4 flex items-start justify-around gap-3">
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
                            className="w-full"
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
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4 flex items-start justify-around gap-3">
                        <PropiedadCreateField
                            id="direccion"
                            name="direccion"
                            label="Direccion"
                            value={form.direccion}
                            onChange={handleChange}
                            placeholder="Ej. Av.Blanco Galindo Km 5, Acera Oeste"
                            error={errors.direccion}
                            className="w-2/3"
                        />

                        <PropiedadCreateField
                            id="is_lote"
                            name="is_lote"
                            label="Es un lote"
                            type="switch"
                            value={form.is_lote}
                            onChange={handleChange}
                            error={errors.is_lote}
                            className="w-1/3"
                        />
                    </div>


                    <div className="flex items-center justify-end gap-2 pt-1">
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
                            className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                            disabled={submitting}
                        >
                            {submitting ? "Guardando..." : "Guardar propiedad"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
