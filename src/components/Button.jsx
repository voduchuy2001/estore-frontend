const Button = ({
  isLoading,
  type,
  classColor,
  className,
  onClick,
  children,
}) => {
  let buttonColorClass =
    'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'

  switch (classColor) {
    case 'warning':
      buttonColorClass =
        'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-yellow-500 text-white hover:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      break
    case 'success':
      buttonColorClass =
        'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-teal-500 text-white hover:bg-teal-600 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      break
    case 'dark':
      buttonColorClass =
        'py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 dark:bg-white dark:text-gray-800'
      break
    default:
      break
  }

  const classNames = [
    buttonColorClass,
    ...(Array.isArray(className) ? className : [className]),
  ]

  return (
    <button
      disabled={isLoading}
      type={type}
      onClick={onClick}
      className={classNames.join(' ')}
    >
      {isLoading ? (
        <span
          className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
          role="status"
          aria-label="loading"
        ></span>
      ) : (
        children
      )}
    </button>
  )
}

export default Button
