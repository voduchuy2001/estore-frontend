import axios from '../axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { clearCart } from '../redux/cartSlide'

const Checkout = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const carts = useSelector((state) => state.product.cartItem)
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    name: '',
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  const handleRedirectVNPay = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const total = parseInt(
      carts.reduce((total, cart) => total + cart.price * cart.qty, 0),
    )

    await axios
      .post(
        '/redirect-vnpay',
        {
          email: data.email,
          name: data.name,
          total: total,
        },
        { withCredentials: true },
      )
      .then(function (response) {
        dispatch(clearCart())
        window.location.href = response.data.url
      })
      .catch(function (error) {
        setIsLoading(false)
        toast.error(error.response.data.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (!carts.length) {
    return navigate('/')
  }

  return (
    <div className="h-full">
      <div className="flex h-full items-center bg-gray-100 py-10 dark:bg-slate-900">
        <div className="mx-auto w-full max-w-md p-2">
          <div className="mt-0 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Place Order
                </h1>
              </div>

              <div className="mt-5">
                <form onSubmit={handleRedirectVNPay}>
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-2 block text-sm dark:text-white"
                      >
                        Your name
                      </label>
                      <input
                        autoFocus
                        autoComplete="off"
                        value={data.name}
                        onChange={handleOnChange}
                        placeholder="Enter your name"
                        type="text"
                        id="name"
                        name="name"
                        className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="mb-2 block text-sm dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        value={data.email}
                        onChange={handleOnChange}
                        placeholder="Enter your email"
                        type="email"
                        id="email"
                        name="email"
                        className="block w-full rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                      />
                    </div>

                    <div className="my-3">
                      <button
                        disabled={isLoading}
                        type="submit"
                        className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        {isLoading && (
                          <span
                            className="inline-block h-4 w-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
                            role="status"
                            aria-label="loading"
                          ></span>
                        )}
                        Place Order Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
