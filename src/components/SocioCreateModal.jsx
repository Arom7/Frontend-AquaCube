import { useEffect, useState } from "react";
import { Lock, Phone, User, UserPlus, X } from "lucide-react";
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
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-brand-secondary/10 to-transparent px-6 py-5">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand-secondary/15 text-brand-secondary">
              <UserPlus className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">
                Registrar un nuevo socio
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Completa la informacion para crear un nuevo socio.
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
          id="socio-create-form"
          onSubmit={handleSubmit}
          className="flex-1 space-y-4 overflow-y-auto px-6 py-5"
        >
          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-brand-secondary" />
              <h4 className="text-sm font-semibold text-slate-800">Datos personales</h4>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
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
                error={fieldErrors.apellido_paterno}
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
              className="mt-3"
            />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-secondary" />
              <h4 className="text-sm font-semibold text-slate-800">Contacto</h4>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SocioCreateField
                id="codigo_ciudad"
                name="codigo_ciudad"
                label="Codigo de pais"
                type="country-code"
                value={form.codigo_ciudad}
                onChange={handleChange}
                placeholder="Selecciona un pais"
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
              />
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-brand-secondary" />
              <h4 className="text-sm font-semibold text-slate-800">Acceso al sistema</h4>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <SocioCreateField
                id="email"
                name="email"
                label="Email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ej. ejemplo@correo.com"
                optional
                error={fieldErrors.email}
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
            form="socio-create-form"
            className="rounded-xl bg-brand-secondary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
          >
            {submitting ? "Guardando..." : "Guardar socio"}
          </button>
        </div>
      </div>
    </div>
  );
}
