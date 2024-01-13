import { useEffect, useState } from "react"
import axios from "../axios"
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/cartSlide";
import { formatCurrencyVND } from "../utils/helper";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    search: ""
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/products`);
        setProducts(response.data.products);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchProducts();
  }, [])

  const searchProduct = async (e) => {
    e.preventDefault()
    
    const response = await axios.get(`/products?search=${data.search}`);
    setProducts(response.data.products);
  }

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
    <div className="my-10">
      <form onChange={searchProduct}>
        <input
          onChange={handleOnchange}
          type="text" 
          id="search" 
          name="search"
          className="border mx-16 my-10 py-3 px-4 block w-80 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" 
          placeholder="Search item..."></input>
      </form>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:mx-16">
            {products.map((product) => (
              <div key={ product._id } className="flex flex-col bg-white border shadow-sm rounded-2xl dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7] mx-1 mb-10">
                <img className="w-full h-auto rounded-t-2xl" src={`http://localhost:8000/images/${product.image}`} alt="Image Description" />
                  <div className="p-4 md:p-5">
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                        { product.name }
                      </h3>
                      <p className="mt-1 text-gray-500 dark:text-gray-400 line-clamp-2">
                        { formatCurrencyVND(product.price ) }
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