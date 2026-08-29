export const INITIAL_FORM = {
	nombre: "",
	apellido_paterno: "",
	apellido_materno: "",
	carnet_identidad: "",
	codigo_ciudad: "",
	telefono: "",
	email: "",
	contrasenia: "",
};

function isValidCI(value) {
    return /^[0-9]{7,8}(-[0-9][A-Za-z])?$/.test(value);
}

function isValidEmail(value) {
	return /^\S+@\S+\.\S+$/.test(value);
}

function isValidPhone(value) {
	return /^[0-9\s()+-]{6,20}$/.test(value);
}

export function validateSocioForm(form) {
	const errors = {};

	if (!form.nombre.trim()) {
		errors.nombre = "El nombre completo es obligatorio.";
	}

	if (!form.apellido_paterno.trim()) {
		errors.apellido_paterno = "El apellido paterno es obligatorio.";
	}

	if (!form.carnet_identidad.trim() && !isValidCI(form.carnet_identidad.trim())) {
		errors.carnet_identidad = "Ingresa un carnet de identidad válido.";
	}

	if (form.email.trim() && !isValidEmail(form.email.trim())) {
		errors.email = "Ingresa un correo electronico valido.";
	}

	if (form.telefono.trim() && !isValidPhone(form.telefono.trim())) {
		errors.telefono = "Ingresa un telefono valido.";
	}

	return errors;
}