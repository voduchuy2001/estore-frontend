const Input = ({
  label,
  value,
  onChange,
  placeholder,
  type,
  id,
  className: additionalClass,
  name,
  error,
}) => {
  const inputClassName = error
    ? `block w-full rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500 ${additionalClass}`
    : `block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 ${additionalClass}`

  return (
    <div>
      <label
        htmlFor={id}
        className={
          error
            ? 'mb-2 font-medium text-red-700 dark:text-red-500'
            : 'mb-2 block text-sm font-medium dark:text-white'
        }
      >
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        id={id}
        name={name}
        className={inputClassName}
      />

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  )
}

export default Input
