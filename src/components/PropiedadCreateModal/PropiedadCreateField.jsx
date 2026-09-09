const BASE_INPUT_CLASS =
	"w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-brand-secondary disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

export function PropiedadCreateField({
	id,
	name,
	label,
	value,
	onChange,
	placeholder,
	type = "text",
	options = [],
	optional = false,
	disabled = false,
	error,
	className = "",
}) {
	const errorId = error ? `${id}-error` : undefined;

	if (type === "switch") {
		return (
			<div className={className}>
				{label && (
					<span className="mb-1.5 block text-sm font-medium text-slate-700">
						{label}
						{optional ? " (opcional)" : ""}
					</span>
				)}
				<button
					type="button"
					id={id}
					role="switch"
					aria-checked={Boolean(value)}
					aria-invalid={Boolean(error)}
					aria-describedby={errorId}
					disabled={disabled}
					onClick={() => onChange({ target: { name, value: !value } })}
					className={`relative inline-flex h-6 w-11 items-center rounded-full transition disabled:cursor-not-allowed disabled:opacity-60 ${
						value ? "bg-brand-secondary" : "bg-slate-300"
					}`}
				>
					<span
						className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
							value ? "translate-x-6" : "translate-x-1"
						}`}
					/>
				</button>
				{error && (
					<p id={errorId} className="mt-1.5 text-xs text-red-600">
						{error}
					</p>
				)}
			</div>
		);
	}

	if (type === "select") {
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
					disabled={disabled}
					className={BASE_INPUT_CLASS}
					aria-invalid={Boolean(error)}
					aria-describedby={errorId}
				>
					<option value="" disabled>
						{placeholder || "Selecciona una opcion"}
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
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
				disabled={disabled}
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