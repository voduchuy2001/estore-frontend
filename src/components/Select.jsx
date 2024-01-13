const Select = ({ label, value, onChange, id, name, options }) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm dark:text-white">
        {label}
      </label>
      <select
        onChange={onChange}
        value={value}
        id={id}
        name={name}
        className="block w-full rounded-lg border border-gray-200 px-4 py-3 pe-9 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Select
