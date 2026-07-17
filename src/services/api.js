import { API_BASE_URL, SOCIOS_ENDPOINT, fetchSocios, httpClient } from "./index";

export const STATUS_ENDPOINT = SOCIOS_ENDPOINT;

export async function checkApiStatus() {
    return fetchSocios();
}

export { httpClient as apiClient };
