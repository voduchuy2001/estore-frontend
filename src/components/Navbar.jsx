import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { CiShoppingCart } from 'react-icons/ci'
import { useDispatch, useSelector } from 'react-redux'
import NavbarItem from './NavbarItem'
import { deleteCartItem } from '../redux/cartSlide'
import { formatCurrencyVND } from '../utils/helper'
import { IMAGE_BASE_URL } from '../utils/constant'

const Header = () => {
  const user = useSelector((state) => state.user)
  const carts = useSelector((state) => state.product.cartItem)
  const dispatch = useDispatch()
  const removeCartItem = (_id) => {
    dispatch(deleteCartItem(_id))
  }

  return (
    <header className="z-50 flex w-full flex-wrap border-b border-gray-200 bg-white py-3 text-sm sm:flex-nowrap sm:justify-start sm:py-0 dark:border-gray-700 dark:bg-gray-800">
      <nav className="relative mx-auto w-full max-w-7xl px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link
            to={''}
            className="flex-none text-xl font-semibold dark:text-white"
          >
            <img src={logo} alt="Logo" className="h-full w-24" />
          </Link>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
              data-hs-collapse="#navbar"
            >
              <svg
                className="h-4 w-4 hs-collapse-open:hidden"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hidden h-4 w-4 flex-shrink-0 hs-collapse-open:block"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>

        <div
          id="navbar"
          className="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
        >
          <div className="mt-5 flex flex-col gap-x-0 gap-y-4 sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:gap-x-7 sm:gap-y-0 sm:ps-7">
            <NavbarItem to="/">Home</NavbarItem>
            <NavbarItem to="/about">About</NavbarItem>
            <NavbarItem to="/contact">Contact</NavbarItem>
            {!user.isAdmin ? (
              ''
            ) : (
              <NavbarItem to="/new-product">New Product</NavbarItem>
            )}

            <div className="flex gap-x-4">
              {user.email ? (
                <NavbarItem to="/profile">
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </NavbarItem>
              ) : (
                <NavbarItem to="/login">
                  <svg
                    className="h-4 w-4 flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </NavbarItem>
              )}

              <button data-hs-overlay="#miniCart">
                <CiShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="miniCart"
        className="hs-overlay fixed start-0 top-0 z-[80] hidden h-full w-full max-w-xs -translate-x-full transform overflow-y-auto border-e bg-white transition-all duration-300 hs-overlay-open:translate-x-0 dark:border-gray-700 dark:bg-gray-800"
        tabIndex="-1"
      >
        <div className="flex items-center justify-between border-b px-4 py-3 dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white">Your cart</h3>

          <button
            type="button"
            className="flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-sm font-semibold text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50 dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            data-hs-overlay="#miniCart"
          >
            <span className="sr-only">Close modal</span>
            <svg
              className="h-4 w-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-4">
          <ul className="-my-6 divide-y divide-gray-200">
            {carts.map((cart) => (
              <li className="flex py-6" key={cart._id}>
                <div className="mx-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={`${IMAGE_BASE_URL}${cart.image}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="mr-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{cart.name}</h3>
                      <p className="ml-4">{formatCurrencyVND(cart.price)}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {cart.category}
                    </p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">x {cart.qty}</p>
                    <div className="flex">
                      <button
                        onClick={() => removeCartItem(cart._id)}
                        type="button"
                        className="font-medium text-red-600 hover:text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {carts.length > 0 && (
            <div className="mt-6">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  {formatCurrencyVND(
                    carts.reduce(
                      (total, cart) => total + cart.price * cart.qty,
                      0,
                    ),
                  )}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={'/checkout'}
                  className="mx-4 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>

                <div className="mt-4">
                  <Link
                    to={'/list-item'}
                    type="button"
                    className="bg-white-600 mx-4 flex items-center justify-center rounded-md border border-slate-300 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-gray-700 hover:text-white"
                  >
                    View all items
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="my-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
              <Link to={'/'}>
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
