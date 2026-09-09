import { useEffect } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";

export function AlertModal({ isOpen, type = "info", title, message, onClose, autoCloseMs }) {
    useEffect(() => {
        if (!isOpen || !autoCloseMs) return;
        const timer = setTimeout(() => onClose?.(), autoCloseMs);
        return () => clearTimeout(timer);
    }, [isOpen, autoCloseMs, onClose]);

    if (!isOpen) return null;

    const isError = type === "error";
    const Icon = isError ? XCircle : CheckCircle2;
    const iconColor = isError ? "text-red-600" : "text-emerald-600";
    const iconBg = isError ? "bg-red-50" : "bg-emerald-50";
    const defaultTitle = isError ? "Ocurrio un error" : "Operacion exitosa";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/55 p-4">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-2xl">
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                        aria-label="Cerrar"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <span className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}>
                    <Icon className={`h-8 w-8 ${iconColor}`} />
                </span>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">{title || defaultTitle}</h3>
                <p className="mt-2 text-sm text-slate-600">{message}</p>

                {isError && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="mt-5 w-full rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                        Cerrar
                    </button>
                )}
            </div>
        </div>
    );
}
