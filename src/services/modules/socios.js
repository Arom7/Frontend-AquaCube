import { httpClient } from "../http/client";

export const SOCIOS_ENDPOINT = "/socios";

function normalizeCollection(payload) {
	if (Array.isArray(payload)) return payload;
	if (Array.isArray(payload?.data)) return payload.data;
	if (Array.isArray(payload?.data?.data)) return payload.data.data;
	return [];
}

export async function fetchSocios(params = {}) {
	const { data } = await httpClient.get(SOCIOS_ENDPOINT, { params });
	return data;
}

export async function listSocios(params = {}) {
	const payload = await fetchSocios(params);
	return normalizeCollection(payload);
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

