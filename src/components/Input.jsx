const Input = ({ label, value, onChange, placeholder, type, id, name }) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium dark:text-white"
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
        className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
      />
    </div>
  )
}

export default Input
