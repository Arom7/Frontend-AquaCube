import { httpClient } from "../http/client";

const CONSUMOS_ENDPOINT = "/consumos";

export async function listConsumos(params = {}) {
  const { data } = await httpClient.get(CONSUMOS_ENDPOINT, { params });
  return data;
}
