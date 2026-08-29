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
	const errorId = error ? `${id}-error` : undefined;

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