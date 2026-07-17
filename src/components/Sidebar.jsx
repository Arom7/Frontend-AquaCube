import { NavLink } from "react-router-dom";
import { appNavigation } from "../config/navigation";

export function Sidebar() {
    return (
        <aside className="w-full rounded-3xl border border-brand-secondary/20 bg-white p-4 shadow-xl lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:w-80 lg:shrink-0 lg:flex lg:flex-col">
            <div className="relative mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-secondary to-lake-700 px-4 py-5 text-brand-neutral">
                <div className="pointer-events-none absolute -right-8 -top-10 h-24 w-24 rounded-full bg-brand-tertiary/35 blur-2xl" />
                <p className="text-xs uppercase tracking-[0.24em] text-brand-neutral/85">
                    Sistema Agua OTB
                </p>
                <h2 className="mt-2 text-xl font-semibold">Panel Administrativo</h2>
                <p className="mt-2 text-sm text-brand-neutral/90">
                    Acceso rapido a modulos y vistas de operacion.
                </p>
            </div>

            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1 lg:space-y-2 lg:overflow-y-auto lg:pr-1">
                {appNavigation.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                            [
                                "group flex items-center gap-3 rounded-2xl border px-3 py-3 transition",
                                isActive
                                    ? "border-brand-secondary/50 bg-brand-secondary/10"
                                    : "border-slate-200 bg-white hover:border-brand-tertiary/60 hover:bg-brand-tertiary/10"
                            ].join(" ")
                        }
                    >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700 group-hover:bg-brand-tertiary/30">
                            {link.badge}
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">{link.label}</p>
                            <p className="truncate text-xs text-slate-500">{link.shortDescription}</p>
                        </div>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
