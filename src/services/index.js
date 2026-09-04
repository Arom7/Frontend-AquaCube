export { API_BASE_URL, httpClient } from "./http/client";

export {
    SOCIOS_ENDPOINT,
    fetchSocios,
    listSocios,
    listSociosPaginated,
    getSocioById,
    createSocio,
    updateSocio,
    deleteSocio
} from "./modules/socios";

export {
    PROPIEDADES_ENDPOINT,
    listPropiedades,
    getPropiedadById,
    createPropiedad,
    updatePropiedad,
    deletePropiedad
} from "./modules/propiedad";

export { listMedidores } from "./modules/medidores";
export { listConsumos } from "./modules/consumos";
