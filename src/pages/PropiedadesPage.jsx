export function PropiedadesPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Propiedades</h2>
      <p className="mt-2 text-sm text-slate-600">
        Modulo preparado para listar propiedades asociadas a cada socio.
      </p>

      <div className="mt-6 rounded-2xl border border-dashed border-brand-secondary/40 bg-brand-secondary/5 p-5">
        <p className="text-sm text-slate-700">
          Puedes integrar filtros por zona, estado y titular para mejorar la
          busqueda.
        </p>
      </div>
    </section>
  );
}
