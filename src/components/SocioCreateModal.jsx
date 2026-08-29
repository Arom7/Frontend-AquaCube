import { useEffect, useState } from "react";
import { SocioCreateField } from "./SocioCreateModal/SocioCreateField";
import { INITIAL_FORM, validateSocioForm } from "./SocioCreateModal/validation";

export function SocioCreateModal({ isOpen, onClose, onSubmit, submitting }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(INITIAL_FORM);
      setFieldErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const nextErrors = { ...prev };
        delete nextErrors[name];
        return nextErrors;
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateSocioForm(form);
    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    await onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              Registrar un nuevo socio
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Completa la informacion para crear un nuevo socio.
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
          <div className="mb-4 flex items-start justify-between gap-3">
            <SocioCreateField
              id="nombre"
              name="nombre"
              label="Nombres"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej. Juan Perez"
              error={fieldErrors.nombre}
            />

            <SocioCreateField
              id="apellido_paterno"
              name="apellido_paterno"
              label="Apellido paterno"
              value={form.apellido_paterno}
              onChange={handleChange}
              placeholder="Ej. Perez"
            />

            <SocioCreateField
              id="apellido_materno"
              name="apellido_materno"
              label="Apellido materno"
              value={form.apellido_materno}
              onChange={handleChange}
              placeholder="Ej. Gomez"
            />
          </div>

          <SocioCreateField
            id="carnet_identidad"
            name="carnet_identidad"
            label="Carnet de identidad"
            value={form.carnet_identidad}
            onChange={handleChange}
            placeholder="Ej. 12345678"
            error={fieldErrors.carnet_identidad}
          />

          <div className="mb-4 flex items-start justify-between gap-3">
            <SocioCreateField
              id="codigo_ciudad"
              name="codigo_ciudad"
              label="Codigo de ciudad"
              value={form.codigo_ciudad}
              onChange={handleChange}
              placeholder="Ej. 123"
              className="w-full"
            />

            <SocioCreateField
              id="telefono"
              name="telefono"
              label="Telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej. 78890890"
              optional
              error={fieldErrors.telefono}
              className="w-full"
            />
          </div>

          <div className="mb-4 flex items-start justify-between gap-3">
            <SocioCreateField
              id="email"
              name="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              placeholder="Ej. ejemplo@correo.com"
              optional
              error={fieldErrors.email}
              className="w-full"
            />

            <SocioCreateField
              id="contrasenia"
              name="contrasenia"
              label="Contraseña"
              type="password"
              value={form.contrasenia}
              onChange={handleChange}
              placeholder="Ej. ********"
              optional
              className="w-full"
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
              {submitting ? "Guardando..." : "Guardar socio"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
