const Textarea = ({
  label,
  value,
  onChange,
  id,
  name,
  rows,
  placeholder,
  error,
}) => {
  const textareaClassName = error
    ? 'block w-full rounded-lg border border-red-500 bg-red-50 px-4 py-3 text-sm text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 disabled:pointer-events-none disabled:opacity-50 dark:border-red-500 dark:bg-gray-700 dark:text-red-500 dark:placeholder-red-500'
    : 'block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600'

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm dark:text-white">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          onChange={onChange}
          value={value}
          id={id}
          name={name}
          rows={rows}
          className={textareaClassName}
          placeholder={placeholder}
        ></textarea>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{error}</span>
        </p>
      )}
    </div>
  )
}

export default Textarea
