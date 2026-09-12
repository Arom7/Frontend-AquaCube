export const initialForm = {
    code: "",
    medidor_nuevo: true,
    medida_inicial: "0",
    propiedad_id: "",
};

export const validateMedidorForm = (form) => {
    const errors = {};
    if (!form.code) errors.code = "El código es requerido";
    if (!form.medida_inicial) errors.medida_inicial = "La medida inicial es un valor requerido";
    if (!form.propiedad_id) errors.propiedad_id = "La propiedad es un valor requerido";
    return errors;
};