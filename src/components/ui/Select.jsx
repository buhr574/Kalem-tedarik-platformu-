const Select = ({
  label,
  value,
  onChange,
  options = [],
  placeholder = "Seçiniz...",
  error,
  className = "",
  required = false,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`glass-input w-full appearance-none cursor-pointer ${
          error ? "border-red-500 focus:ring-red-500" : ""
        } ${className}`}
        required={required}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option
            key={typeof option === "object" ? option.value : option}
            value={typeof option === "object" ? option.value : option}
            className="bg-slate-800 text-white"
          >
            {typeof option === "object" ? option.label : option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default Select;
