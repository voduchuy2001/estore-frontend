import { Link, useMatch } from 'react-router-dom';

const NavbarItem = ({to, children}) => {
  const isActive = useMatch(to);

  return (
    <Link to={to} className={isActive ? 'font-medium text-blue-600 sm:py-6 dark:text-blue-500' : 'font-medium text-gray-500 hover:text-gray-400 sm:py-6 dark:text-gray-400 dark:hover:text-gray-500'} aria-current={isActive ? 'page' : undefined}>
      {children}
    </Link>
  );
};

export default NavbarItem;