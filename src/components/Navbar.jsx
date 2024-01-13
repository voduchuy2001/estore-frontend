import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import { CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import { deleteCartItem } from "../redux/cartSlide";
import { formatCurrencyVND } from "../utils/helper";

const Header = () => {
  const email = useSelector((state) => state.user.email);
  const carts = useSelector((state) => state.product.cartItem)
  const dispatch = useDispatch();
  const isAdmin = "huy@gmail.com";
  const removeCartItem = (_id) => {
    dispatch(deleteCartItem(_id))
  }

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-gray-800 dark:border-gray-700">
      <nav className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex items-center justify-between">
          <Link to={""} className="flex-none text-xl font-semibold dark:text-white">
            <img src={logo} alt="logo" />
          </Link>
          <div className="sm:hidden">
            <button type="button" className="hs-collapse-toggle w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
              <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
              <svg className="hs-collapse-open:block flex-shrink-0 hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </div>
        </div>

        <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            <NavbarItem to="/">Home</NavbarItem>
            <NavbarItem to="/about">About</NavbarItem>
            <NavbarItem to="/contact">Contact</NavbarItem>
            { email !== isAdmin ? '' : <NavbarItem to="/new-product">New Product</NavbarItem> }
            
            <div className="flex gap-x-4">
              { email ? (
                  <NavbarItem to="/profile">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                  </NavbarItem>
              ) : <NavbarItem to="/login">
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                  </NavbarItem>
              }

              <button data-hs-overlay="#miniCart">
                <CiShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div id="miniCart" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full fixed top-0 start-0 transition-all duration-300 transform h-full max-w-md w-full z-[80] bg-white border-e dark:bg-gray-800 dark:border-gray-700 hidden hs-overlay-backdrop-open:bg-slate-100/10" tabIndex="-1">
        <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
          <h3 className="font-bold text-gray-800 dark:text-white">
            Your cart
          </h3>

          <button type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#miniCart">
            <span className="sr-only">Close modal</span>
            <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        
        <div className="mt-4">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {
                carts.slice(0, 2).map((cart) => (
                  <li className="flex py-6" key={cart._id}>
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 mx-4">
                      <img src={`http://localhost:8000/images/${cart.image}`} className="h-full w-full object-cover object-center" />
                    </div>

                    <div className="mr-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            { cart.name }
                          </h3>
                          <p className="ml-4">{ formatCurrencyVND(cart.price) }</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{ cart.category }</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">x { cart.qty }</p>
                        <div className="flex">
                          <button
                            onClick={ () => removeCartItem(cart._id) }
                            type="button" 
                            className="font-medium text-red-600 hover:text-red-500">Remove</button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>

          {carts.length > 0 && (
            <div className="mt-6"> 
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  { formatCurrencyVND(carts.reduce((total, cart) => total + (cart.price * cart.qty), 0)) }
                </div>
              </div>

              <div className="mt-6">
                <Link to={"/checkout"} 
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 mx-4">Checkout</Link>
              </div>
            </div>
          )}

          {carts.length > 2 && (
            <div className="mt-4">
              <Link
                to={"/list-item"}
                type="button"
                className="flex items-center justify-center rounded-md border border-slate-300 bg-white-600 px-6 py-3 text-base font-medium text-slate-700 shadow-sm hover:bg-gray-700 hover:text-white mx-4"
              >
                View all items
              </Link>
            </div>
          )}

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or
                <button 
                  type="button" 
                  className="font-medium text-indigo-600 hover:text-indigo-500">
                   Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header