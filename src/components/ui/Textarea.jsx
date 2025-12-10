const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  className = '',
  required = false,
  rows = 4,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`glass-input w-full resize-none ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className}`}
        required={required}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}

export default Textarea



