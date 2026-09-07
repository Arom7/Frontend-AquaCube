export function normalizeCollection(payload) {
	if (Array.isArray(payload)) return payload;
	if (Array.isArray(payload?.data)) return payload.data;
	return [];
}

export function normalizePaginationMeta(payload) {
	const meta = payload?.pagination;
	const currentPage = Number(meta?.current_page) || 1;
	const lastPage = Number(meta?.last_page) || 1;
	const perPage = Number(meta?.per_page) || normalizeCollection(payload).length || 1;
	const total = Number(meta?.total) ?? normalizeCollection(payload).length;

	return { currentPage, lastPage, perPage, total };
}
