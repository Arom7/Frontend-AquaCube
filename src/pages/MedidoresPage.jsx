export function MedidoresPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Medidores</h2>
      <p className="mt-2 text-sm text-slate-600">
        Espacio para administrar inventario de medidores y su asignacion.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <article className="rounded-2xl border border-brand-tertiary/35 bg-brand-tertiary/10 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Activos</h3>
          <p className="mt-1 text-xs text-slate-700">Medidores en operacion.</p>
        </article>
        <article className="rounded-2xl border border-slate-300 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Pendientes</h3>
          <p className="mt-1 text-xs text-slate-700">Por instalar o revisar.</p>
        </article>
      </div>
    </section>
  );
}
