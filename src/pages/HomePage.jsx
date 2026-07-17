import { Link } from "react-router-dom";

export function HomePage() {
    return (
        <section className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-brand-secondary/80">
                    Ruta de aprendizaje
                </p>
                <h2 className="mt-3 font-display text-4xl font-semibold leading-tight text-slate-900">
                    React para consumir tu API de Laravel sin perder enfoque backend
                </h2>
                <p className="mt-4 max-w-2xl text-base text-slate-600">
                    Este frontend esta pensado para que construyas vistas por modulos,
                    conectando cada pantalla a endpoints reales de tu backend. Empieza por
                    leer datos, luego agrega formularios y finalmente autenticacion.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Link
                        to="/estado-api"
                        className="rounded-2xl bg-brand-secondary px-5 py-3 text-sm font-semibold text-brand-neutral transition hover:brightness-110"
                    >
                        Probar conexion API
                    </Link>
                    <span className="text-sm text-slate-600">
                        Base URL actual:{" "}
                        <strong>{import.meta.env.VITE_API_BASE_URL}</strong>
                    </span>
                </div>
            </article>

            <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-xl font-semibold text-slate-900">
                    Orden recomendado
                </h3>
                <ol className="mt-4 space-y-3 text-sm text-slate-700">
                    <li>1. Modela servicios API en src/services.</li>
                    <li>2. Crea una pagina por recurso de Laravel.</li>
                    <li>3. Valida formularios antes de enviar.</li>
                    <li>4. Agrega estados de carga y error siempre.</li>
                    <li>5. Refactoriza a componentes reutilizables.</li>
                </ol>
            </aside>
        </section>
    );
}
