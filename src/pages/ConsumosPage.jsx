export function ConsumosPage() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Consumos</h2>
      <p className="mt-2 text-sm text-slate-600">
        Aqui puedes construir lectura mensual, historico y alertas de consumo.
      </p>

      <div className="mt-6 rounded-2xl border border-brand-tertiary/35 bg-brand-tertiary/10 p-5">
        <p className="text-sm text-slate-700">
          Recomendacion: mostrar variacion mensual y consumo promedio por socio.
        </p>
      </div>
    </section>
  );
}
