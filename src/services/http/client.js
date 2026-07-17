import axios from "axios";
import { setupHttpInterceptors } from "./interceptors";

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "")
	.trim()
	.replace(/\/+$/, "");

export const httpClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		Accept: "application/json"
	}
});

setupHttpInterceptors(httpClient);

