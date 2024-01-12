import { useEffect, useState } from "react"
import axios from "../axios"
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productSlice";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products');
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchProducts();
  }, [])

  const addToCart = (id, name, price, category, image) => {
    dispatch(
      addCartItem({
        _id: id,
        name: name,
        price: price,
        category: category,
        image: image,
      })
    );
  };

  return (
    <div>
        <div data-hs-carousel='{
          "loadingClasses": "opacity-0",
          "isAutoPlay": true
          }' className="relative">
          <div className="hs-carousel relative overflow-hidden w-full min-h-[350px] bg-white mb-5">
              <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                  <div className="hs-carousel-slide">
                      <div className="flex justify-center h-full bg-gray-100 p-6">
                      <span className="self-center text-4xl transition duration-700">First slide</span>
                      </div>
                  </div>

                  <div className="hs-carousel-slide">
                      <div className="flex justify-center h-full bg-gray-200 p-6">
                      <span className="self-center text-4xl transition duration-700">Second slide</span>
                      </div>
                  </div>

                  <div className="hs-carousel-slide">
                      <div className="flex justify-center h-full bg-gray-300 p-6">
                      <span className="self-center text-4xl transition duration-700">Third slide</span>
                      </div>
                  </div>
              </div>
          </div>

          <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
              <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
              <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
              <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 w-3 h-3 border border-gray-400 rounded-full cursor-pointer"></span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:mx-16">
            {products.map((product) => (
              <div key={ product._id } className="flex flex-col bg-white border shadow-sm rounded-2xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] mx-1 mb-10">
                <img className="w-full h-auto rounded-t-2xl" src={`http://localhost:8000/images/${product.image}`} alt="Image Description" />
                  <div className="p-4 md:p-5">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        { product.name }
                      </h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-2">
                        { product.description }
                      </p>
                      <button
                        onClick={() => addToCart(product._id, product.name, product.price, product.category, product.image)}
                        className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                      >
                        Add to cart
                      </button>
                  </div>
              </div>
          ))}
        </div>
    </div>
  )
}

export default Home