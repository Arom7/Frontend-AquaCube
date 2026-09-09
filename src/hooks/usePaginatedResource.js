import { useCallback, useEffect, useState } from "react";

const DEFAULT_META = { currentPage: 1, lastPage: 1, total: 0 };

function withoutEmptyValues(source) {
    return Object.fromEntries(
        Object.entries(source).filter(([, value]) => value !== "" && value !== undefined && value !== null)
    );
}

/**
 * Encapsula el patron de listado paginado: busqueda con debounce, filtros
 * adicionales y estado de carga/paginacion, reutilizable entre modulos.
 */
export function usePaginatedResource({
    fetchPage,
    perPage = 10,
    initialFilters = {},
    debounceMs = 400,
}) {
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [filters, setFilters] = useState(initialFilters);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState([]);
    const [meta, setMeta] = useState(DEFAULT_META);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const filtersKey = JSON.stringify(filters);

    useEffect(() => {
        const timeoutId = setTimeout(() => setDebouncedSearch(search.trim()), debounceMs);
        return () => clearTimeout(timeoutId);
    }, [search, debounceMs]);

    useEffect(() => {
        setPage(1);
    }, [debouncedSearch, filtersKey]);

    const reload = useCallback(async () => {
        try {
            setLoading(true);
            setError("");
            const params = {
                page,
                per_page: perPage,
                ...(debouncedSearch ? { search: debouncedSearch } : {}),
                ...withoutEmptyValues(filters),
            };
            const { items: nextItems, meta: nextMeta } = await fetchPage(params);
            setItems(nextItems);
            setMeta(nextMeta);
        } catch (err) {
            setError(err?.message || "No fue posible cargar los datos.");
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPage, page, perPage, debouncedSearch, filtersKey]);

    useEffect(() => {
        reload();
    }, [reload]);

    const setFilter = useCallback((key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    }, []);

    return {
        items,
        meta,
        loading,
        error,
        page,
        setPage,
        search,
        setSearch,
        filters,
        setFilter,
        setFilters,
        reload,
    };
}
