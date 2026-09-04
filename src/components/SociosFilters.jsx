const INPUT_CLASS =
  "w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-brand-secondary";

export function SociosFilters({ search, onSearchChange, activo, onActivoChange }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label htmlFor="search" className="mb-1.5 block text-sm font-medium text-slate-700">
          Buscar
        </label>
        <input
          id="search"
          name="search"
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar por nombre, apellidos o carnet..."
          className={INPUT_CLASS}
          autoComplete="off"
        />
      </div>

      <div className="sm:w-56">
        <label htmlFor="activo" className="mb-1.5 block text-sm font-medium text-slate-700">
          Estado
        </label>
        <select
          id="activo"
          name="activo"
          value={activo}
          onChange={(event) => onActivoChange(event.target.value)}
          className={INPUT_CLASS}
        >
          <option value="">Todos</option>
          <option value="true">Activos</option>
          <option value="false">Inactivos</option>
        </select>
      </div>
    </div>
  );
}
