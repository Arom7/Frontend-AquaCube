import { httpClient } from "../http/client";

export const PROPIEDADES_ENDPOINT = "/propiedades";

export async function listPropiedades(params = {}) {
	const { data } = await httpClient.get(PROPIEDADES_ENDPOINT, { params });
	return data;
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

