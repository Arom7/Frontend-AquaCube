import { httpClient } from "../http/client";
import { normalizeCollection, normalizePaginationMeta } from "../http/normalize";

export const SOCIOS_ENDPOINT = "/socios";

export async function fetchSocios(params = {}) {
	const { data } = await httpClient.get(SOCIOS_ENDPOINT, { params });
	return data;
}

export async function listSocios(params = {}) {
	const payload = await fetchSocios(params);
	return normalizeCollection(payload);
}

export async function listSociosPaginated(params = {}) {
	const payload = await fetchSocios(params);
	return {
		items: normalizeCollection(payload),
		meta: normalizePaginationMeta(payload),
	};
}

export async function getSocioById(id) {
	const { data } = await httpClient.get(`${SOCIOS_ENDPOINT}/${id}`);
	return data;
}

export async function createSocio(formData) {
	const { data } = await httpClient.post(SOCIOS_ENDPOINT, formData);
	return data;
}

export async function updateSocio(id, formData) {
	const { data } = await httpClient.put(`${SOCIOS_ENDPOINT}/${id}`, formData);
	return data;
}

export async function deleteSocio(id) {
	const { data } = await httpClient.delete(`${SOCIOS_ENDPOINT}/${id}`);
	return data;
}

