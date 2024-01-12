import axios from "../axios";
import { useState } from "react"
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const carts = useSelector((state) => state.product.cartItem)

  const [data, setData] = useState({
    email: "",
    name: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleRedirectVNPay = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    await axios.post('/redirect-vnpay', {
      email: data.email,
      name: data.name,
      total: parseInt(carts.reduce((total, cart) => total + (cart.price * cart.qty), 0)),
    }, { withCredentials: true })
    .then(function (response) {
      window.location.href = response.data.url
    })
    .catch(function (error) {
      setIsLoading(false)
      toast.error(error.response.data.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  return (
    <div className="h-full">
      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-10">
        <div className="w-full max-w-md mx-auto p-2">
          <div className="mt-0 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
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
                      <label htmlFor="name" className="block text-sm mb-2 dark:text-white">Your name</label>
                        <input
                          autoFocus
                          autoComplete="off"
                          value={data.name}
                          onChange={handleOnChange}
                          placeholder="Enter your name" 
                          type="text" 
                          id="name" 
                          name="name" 
                          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Your email</label>
                        <input
                          value={data.email}
                          onChange={handleOnChange}
                          placeholder="Enter your email" 
                          type="email" 
                          id="email" 
                          name="email" 
                          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                    </div>

                    <div className="my-3">
                      <button 
                        disabled={isLoading}
                        type="submit" 
                        className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        { isLoading && (
                          <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                          )
                        }
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