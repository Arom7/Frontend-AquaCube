import { httpClient } from "../http/client";
import { normalizeCollection, normalizePaginationMeta } from "../http/normalize";

export const MEDIDORES_ENDPOINT = "/medidores";

export async function listMedidores(params = {}) {
  const { data } = await httpClient.get(MEDIDORES_ENDPOINT, { params });
  return data;
}

export async function listMedidoresPaginated(params = {}) {
  const payload = await listMedidores(params);
  return {
    items: normalizeCollection(payload),
    meta: normalizePaginationMeta(payload),
  };
}

export async function createMedidor(payload) {
  const { data } = await httpClient.post(MEDIDORES_ENDPOINT, payload);
  return data;
}
