export function setupHttpInterceptors(client) {
    client.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("auth_token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    );

    client.interceptors.response.use(
        (response) => response,
        (error) => {
            const status = error?.response?.status;
            const message =
                error?.response?.data?.message ||
                error?.message ||
                "Error inesperado de comunicacion con el servidor.";

            return Promise.reject({
                ...error,
                status,
                message
            });
        }
    );
}
