export const INITIAL_FORM = {
	code: "",
	direccion: "",
	is_lote: false,
    total_multas: "",
	precio_conexion: "",
	fecha_conexion: "",
	socio: ""
};

export function validatePropiedadForm(form) {
	const errors = {};

	if (!form.code.trim()) {
		errors.code = "El codigo de la propiedad es obligatorio.";
	}

	if (!form.direccion.trim()) {
		errors.direccion = "La direccion de la propiedad es obligatoria.";
	}

    if (form.is_lote && form.fecha_conexion.trim()){
        errors.fecha_conexion = "Una propiedad que es de tipo lote no debe tener una fecha de conexion definida.";
    }

    if (form.fecha_conexion && new Date(form.fecha_conexion) > new Date()) {
        errors.fecha_conexion = "La fecha de conexion no puede ser futura.";
    }

	if (!form.socio.trim()) {
		errors.socio = "El socio es un dato obligatorio.";
	}

	return errors;
}