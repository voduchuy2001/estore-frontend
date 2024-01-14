import { useDispatch, useSelector } from 'react-redux'
import { decreaseQty, deleteCartItem, increaseQty } from '../redux/cartSlide'
import { formatCurrencyVND } from '../utils/helper'
import Button from '../components/Button'
import { IMAGE_BASE_URL } from '../utils/constant'
import { useNavigate } from 'react-router-dom'

const CartList = () => {
  const carts = useSelector((state) => state.product.cartItem)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const removeCartItem = (_id) => {
    dispatch(deleteCartItem(_id))
  }

  const increase = (_id) => {
    dispatch(increaseQty(_id))
  }

  const decrease = (_id) => {
    dispatch(decreaseQty(_id))
  }

  const redirectPlaceOrder = () => {
    navigate('/checkout')
  }

  return (
    <div className="h-full bg-gray-100 pt-5 dark:bg-slate-600">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {carts.map((cart) => (
            <div
              key={cart._id}
              className="mb-6 justify-between rounded-lg bg-white p-6 shadow-sm sm:flex sm:justify-start dark:bg-slate-900 dark:text-slate-100"
            >
              <img
                src={`${IMAGE_BASE_URL}${cart.image}`}
                alt="product-image"
                className="w-full rounded-lg sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-slate-100">
                    {cart.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700 dark:text-slate-100">
                    {' '}
                    {formatCurrencyVND(cart.price)}
                  </p>
                </div>

                <div className="mt-4 flex justify-between sm:mt-0 sm:block sm:space-x-6 sm:space-y-6">
                  <div className="flex items-center border-gray-100">
                    <button
                      onClick={() => decrease(cart._id)}
                      className="cursor-pointer rounded-l bg-gray-100 px-3.5 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:border dark:border-white dark:bg-slate-900 dark:text-slate-100"
                    >
                      {' '}
                      -{' '}
                    </button>
                    <input
                      readOnly
                      className="h-8 w-8 border bg-white text-center text-xs outline-none dark:bg-slate-600 dark:text-slate-100"
                      type="number"
                      value={cart.qty}
                    />
                    <button
                      onClick={() => increase(cart._id)}
                      className=" cursor-pointer rounded-r bg-gray-100 px-3 py-1 duration-100 hover:bg-blue-500 hover:text-blue-50 dark:border dark:border-white dark:bg-slate-900 dark:text-slate-100"
                    >
                      {' '}
                      +{' '}
                    </button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm">
                      {formatCurrencyVND(cart.qty * cart.price)}
                    </p>
                    <button onClick={() => removeCartItem(cart._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {carts.length > 0 && (
          <div className="my-6 h-full rounded-md border bg-white p-6 shadow-sm md:mt-0 md:w-1/3">
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">
                  {formatCurrencyVND(
                    carts.reduce(
                      (total, cart) => total + cart.price * cart.qty,
                      0,
                    ),
                  )}
                </p>
              </div>
            </div>

            <Button
              onClick={redirectPlaceOrder}
              className={'my-3 w-full justify-center'}
            >
              Checkout
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartList
