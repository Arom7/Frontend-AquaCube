import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-brand-neutral text-slate-900">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-4 sm:px-5 sm:py-5 lg:flex-row lg:gap-6 lg:px-6 lg:py-6">
        <Sidebar />
        <main className="w-full min-w-0">
          <div className="mb-5 rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 sm:py-5">
            <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">
              Sistema Agua OTB Campinia 2
            </h1>
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-brand-secondary sm:text-xs sm:tracking-[0.2em]">
              Desarrollo de sistema de administracion de agua potable para la OTB
              Campinia 2.
            </p>
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
