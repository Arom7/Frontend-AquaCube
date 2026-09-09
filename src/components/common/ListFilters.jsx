const INPUT_CLASS =
    "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-brand-secondary";

/**
 * Barra de filtros generica: un buscador de texto mas selects opcionales,
 * reutilizable por cualquier pagina de listado paginado.
 */
export function ListFilters({
    search,
    onSearchChange,
    searchId = "search",
    searchLabel = "Buscar",
    searchPlaceholder = "Buscar...",
    selects = [],
}) {
    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <div className="flex-1">
                <label htmlFor={searchId} className="mb-1.5 block text-sm font-medium text-slate-700">
                    {searchLabel}
                </label>
                <input
                    id={searchId}
                    name={searchId}
                    type="text"
                    value={search}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder={searchPlaceholder}
                    className={INPUT_CLASS}
                    autoComplete="off"
                />
            </div>

            {selects.map(({ id, label, value, onChange, options }) => (
                <div key={id} className="sm:w-56">
                    <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
                        {label}
                    </label>
                    <select
                        id={id}
                        name={id}
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        className={INPUT_CLASS}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            ))}
        </div>
    );
}
