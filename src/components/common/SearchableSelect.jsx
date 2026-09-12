import { useEffect, useMemo, useRef, useState } from "react";

const INPUT_CLASS =
	"w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-brand-secondary disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400";

/**
 * Select con buscador: input de texto que filtra una lista de opciones
 * {value, label}, reutilizable por cualquier campo de formulario.
 */
export function SearchableSelect({
	id,
	name,
	value,
	onChange,
	options = [],
	placeholder = "Buscar...",
	disabled = false,
	className = "",
	error,
	errorId,
}) {
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);
	const containerRef = useRef(null);

	const selectedOption = useMemo(
		() => options.find((option) => option.value === value) || null,
		[options, value]
	);

	useEffect(() => {
		setQuery(selectedOption?.label || "");
	}, [selectedOption]);

	const filteredOptions = useMemo(() => {
		const normalizedQuery = query.trim().toLowerCase();
		if (!normalizedQuery || query === selectedOption?.label) return options;
		return options.filter((option) => option.label.toLowerCase().includes(normalizedQuery));
	}, [options, query, selectedOption]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setIsOpen(false);
				setQuery(selectedOption?.label || "");
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [selectedOption]);

	const selectOption = (option) => {
		onChange({ target: { name, value: option.value } });
		setQuery(option.label);
		setIsOpen(false);
		setHighlightedIndex(-1);
	};

	const handleKeyDown = (event) => {
		if (!isOpen && (event.key === "ArrowDown" || event.key === "Enter")) {
			setIsOpen(true);
			return;
		}
		if (!isOpen) return;

		if (event.key === "ArrowDown") {
			event.preventDefault();
			setHighlightedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			setHighlightedIndex((prev) => Math.max(prev - 1, 0));
		} else if (event.key === "Enter") {
			event.preventDefault();
			const option = filteredOptions[highlightedIndex];
			if (option) selectOption(option);
		} else if (event.key === "Escape") {
			setIsOpen(false);
			setQuery(selectedOption?.label || "");
		}
	};

	return (
		<div ref={containerRef} className={`relative ${className}`}>
			<input
				id={id}
				role="combobox"
				aria-expanded={isOpen}
				aria-controls={`${id}-listbox`}
				aria-autocomplete="list"
				aria-invalid={Boolean(error)}
				aria-describedby={errorId}
				autoComplete="off"
				disabled={disabled}
				value={query}
				placeholder={placeholder}
				onFocus={() => setIsOpen(true)}
				onChange={(event) => {
					const nextQuery = event.target.value;
					setQuery(nextQuery);
					setIsOpen(true);
					setHighlightedIndex(-1);
					if (nextQuery === "") {
						onChange({ target: { name, value: "" } });
					}
				}}
				onKeyDown={handleKeyDown}
				className={INPUT_CLASS}
			/>

			{isOpen && !disabled && (
				<ul
					id={`${id}-listbox`}
					role="listbox"
					className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg"
				>
					{filteredOptions.length === 0 && (
						<li className="px-3 py-2 text-slate-500">Sin resultados</li>
					)}
					{filteredOptions.map((option, index) => (
						<li
							key={option.value}
							role="option"
							aria-selected={option.value === value}
							onMouseDown={(event) => {
								event.preventDefault();
								selectOption(option);
							}}
							onMouseEnter={() => setHighlightedIndex(index)}
							className={`cursor-pointer px-3 py-2 ${
								index === highlightedIndex ? "bg-brand-secondary/10 text-brand-secondary" : "text-slate-700"
							} ${option.value === value ? "font-semibold" : ""}`}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
