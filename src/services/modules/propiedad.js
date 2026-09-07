import { httpClient } from "../http/client";
import { normalizeCollection, normalizePaginationMeta } from "../http/normalize";

export const PROPIEDADES_ENDPOINT = "/propiedades";

export async function fetchPropiedades(params = {}) {
	const { data } = await httpClient.get(PROPIEDADES_ENDPOINT, { params });
	return data;
}

export async function listPropiedades(params = {}) {
	const data = await fetchPropiedades(params);
	return normalizeCollection(data);
}

export async function listPropiedadesPaginated(params = {}) {
	const payload = await fetchPropiedades(params);
	return {
		items: normalizeCollection(payload),
		meta: normalizePaginationMeta(payload),
	};
}

export async function getPropiedadById(id) {
	const { data } = await httpClient.get(`${PROPIEDADES_ENDPOINT}/${id}`);
	return data;
}

export async function createPropiedad(payload) {
	const { data } = await httpClient.post(PROPIEDADES_ENDPOINT, payload);
	return data;
}

export async function updatePropiedad(id, payload) {
	const { data } = await httpClient.put(`${PROPIEDADES_ENDPOINT}/${id}`, payload);
	return data;
}

export async function deletePropiedad(id) {
	const { data } = await httpClient.delete(`${PROPIEDADES_ENDPOINT}/${id}`);
	return data;
}

