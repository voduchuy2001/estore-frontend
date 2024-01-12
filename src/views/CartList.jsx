import { useDispatch, useSelector } from "react-redux"
import { decreaseQty, deleteCartItem, increaseQty } from "../redux/productSlice";
import { Link } from "react-router-dom";

const CartList = () => {
    const carts = useSelector((state) => state.product.cartItem)
    const dispatch = useDispatch();

    const removeCartItem = (_id) => {
        dispatch(deleteCartItem(_id))
      }

      const increase = (_id) => {
        dispatch(increaseQty(_id))
      }

      const decrease = (_id) => {
        dispatch(decreaseQty(_id))
      }

  return (
    <div className="h-full bg-gray-100 pt-5">
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
            {carts.map((cart) => (
            <div key={cart._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-sm sm:flex sm:justify-start">
                <img src={`http://localhost:8000/images/${cart.image}`} alt="product-image" className="w-full rounded-lg sm:w-40" />
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">{ cart.name }</h2>
                        <p className="mt-1 text-xs text-gray-700">${ cart.price }</p>
                    </div>

                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                                <button
                                    onClick={ () => decrease(cart._id)}
                                    className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </button>
                                <input
                                    readOnly
                                    className="h-8 w-8 border bg-white text-center text-xs outline-none" 
                                    type="number" 
                                    value={cart.qty} />
                                <button
                                    onClick={ () => increase(cart._id)}
                                    className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </button>
                            </div>
                            <div className="flex items-center space-x-4">
                                <p className="text-sm">${ cart.qty * cart.price }</p>
                                <button
                                      onClick={ () => removeCartItem(cart._id) }
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

        { carts.length > 0 && (
            <div className="my-6 h-full rounded-md border bg-white p-6 shadow-sm md:mt-0 md:w-1/3">
                <div className="flex justify-between">
                    <p className="text-lg font-bold">Total</p>
                    <div className="">
                        <p className="mb-1 text-lg font-bold">$ { carts.reduce((total, cart) => total + (cart.price * cart.qty), 0) }</p>
                    </div>
                </div>
                    
                <Link
                    to={"/checkout"}
                    className="w-full mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Check out</Link>
            </div>
        )}
        </div>
  </div>
  )
}

export default CartList