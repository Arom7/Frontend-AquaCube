import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { COUNTRY_CODES } from "./countryCodes";

const BASE_INPUT_CLASS =
	"w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-brand-secondary";

export function SocioCreateField({
	id,
	name,
	label,
	value,
	onChange,
	placeholder,
	type = "text",
	optional = false,
	error,
	className = "",
}) {
	const [showPassword, setShowPassword] = useState(false);
	const errorId = error ? `${id}-error` : undefined;

	if (type === "country-code") {
		return (
			<div className={className}>
				<label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
					{label}
					{optional ? " (opcional)" : ""}
				</label>
				<select
					id={id}
					name={name}
					value={value}
					onChange={onChange}
					className={BASE_INPUT_CLASS}
					aria-invalid={Boolean(error)}
					aria-describedby={errorId}
				>
					<option value="" disabled>
						{placeholder || "Selecciona un pais"}
					</option>
					{COUNTRY_CODES.map((country) => (
						<option key={`${country.dialCode}-${country.name}`} value={country.dialCode}>
							{country.flag} {country.name} ({country.dialCode})
						</option>
					))}
				</select>
				{error && (
					<p id={errorId} className="mt-1.5 text-xs text-red-600">
						{error}
					</p>
				)}
			</div>
		);
	}

	if (type === "password") {
		return (
			<div className={className}>
				<label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
					{label}
					{optional ? " (opcional)" : ""}
				</label>
				<div className="relative">
					<input
						id={id}
						name={name}
						type={showPassword ? "text" : "password"}
						value={value}
						onChange={onChange}
						className={`${BASE_INPUT_CLASS} pr-10`}
						placeholder={placeholder}
						autoComplete="off"
						aria-invalid={Boolean(error)}
						aria-describedby={errorId}
					/>
					<button
						type="button"
						onClick={() => setShowPassword((prev) => !prev)}
						className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 transition hover:text-slate-600"
						aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
						tabIndex={-1}
					>
						{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
					</button>
				</div>
				{error && (
					<p id={errorId} className="mt-1.5 text-xs text-red-600">
						{error}
					</p>
				)}
			</div>
		);
	}

	return (
		<div className={className}>
			<label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-700">
				{label}
				{optional ? " (opcional)" : ""}
			</label>
			<input
				id={id}
				name={name}
				type={type}
				value={value}
				onChange={onChange}
				className={BASE_INPUT_CLASS}
				placeholder={placeholder}
				autoComplete="off"
				aria-invalid={Boolean(error)}
				aria-describedby={errorId}
			/>
			{error && (
				<p id={errorId} className="mt-1.5 text-xs text-red-600">
					{error}
				</p>
			)}
		</div>
	);
}