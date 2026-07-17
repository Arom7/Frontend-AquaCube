import { httpClient } from "../http/client";

const MEDIDORES_ENDPOINT = "/medidores";

export async function listMedidores(params = {}) {
  const { data } = await httpClient.get(MEDIDORES_ENDPOINT, { params });
  return data;
}
