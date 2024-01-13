import { useEffect, useState } from 'react'
import axios from '../axios'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { addCartItem } from '../redux/cartSlide'
import { formatCurrencyVND } from '../utils/helper'
import Button from '../components/Button'
import productImageDefault from '../assets/product-image.jpg'
import { IMAGE_BASE_URL } from '../utils/constant'

const Home = () => {
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const [data, setData] = useState({
    search: '',
  })

  const handleOnchange = (e) => {
    const { name, value } = e.target
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products`)
        setProducts(response.data.products)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }

    fetchProducts()
  }, [])

  const searchProducts = async (e) => {
    e.preventDefault()

    const response = await axios.get(`/products?search=${data.search}`)
    setProducts(response.data.products)
  }

  const addToCart = (id, name, price, category, image) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      }),
    )
  }

  return (
    <div>
      <form onChange={searchProducts}>
        <input
          onChange={handleOnchange}
          type="text"
          id="search"
          name="search"
          className="mx-16 my-10 block w-80 rounded-lg border border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
          placeholder="Search item..."
        ></input>
      </form>

      <div className="grid grid-cols-2 gap-4 md:mx-16 md:grid-cols-5">
        {products.map((product) => (
          <div
            key={product._id}
            className="mx-1 mb-10 flex flex-col rounded-2xl border bg-white shadow-sm dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]"
          >
            <img
              className="h-auto w-full rounded-t-2xl"
              src={
                product.image
                  ? `${IMAGE_BASE_URL}${product.image}`
                  : productImageDefault
              }
              alt="Image Description"
            />
            <div className="p-4 md:p-5">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="mt-1 line-clamp-2 text-gray-500 dark:text-gray-400">
                {formatCurrencyVND(product.price)}
              </p>

              <Button
                className={'mt-4 w-full justify-center'}
                onClick={() =>
                  addToCart(
                    product._id,
                    product.name,
                    product.price,
                    product.category,
                    product.image,
                  )
                }
              >
                Add To Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home
