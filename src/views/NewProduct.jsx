import { useState } from "react";
import { toast } from "sonner";
import axios from "../axios";
import { BsCloudUpload } from "react-icons/bs";
import Home from "../views/Home"
import { useSelector } from "react-redux";

const NewProduct = () => {
  const [data, setData] = useState({
    productName: "",
    category: "",
    description: "",
    price: "",
    image: null,
    previewImage: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const adminEmail = useSelector((state) => state.user.email)
  const isAdmin = "huy@gmail.com";

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const previewImage = (e) => {
    const image = e.target.files[0];
    setData((prev) => ({
      ...prev,
      image: image,
      previewImage: URL.createObjectURL(image),
    }));
  };

  const removeReview = () => {
    setData((pre) => ({
      ...pre,
      image: null,
      previewImage: null,
    }));
  };

  const handleNewProduct = async (e) => {
    e.preventDefault();
    const { productName, image, category, price, description } = data;
  
    if (!productName || !image || !category || !price || !description) {
      toast.error("Missing input field");
      return;
    }
  
    try {
      setIsLoading(true);
      console.log(data)
      const response = await axios.post("/new-product", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success(response.data.message);
      setData({
        productName: "",
        category: "",
        description: "",
        price: "",
        image: null,
        previewImage: null,
      });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAdmin !== adminEmail) {
    return <Home />
  }
    return (
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          <div className="mx-auto max-w-2xl">
            <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-gray-800 dark:border-gray-700">
              <form onSubmit={handleNewProduct}>
                <div className="mb-4 sm:mb-8">
                    <div>
                      <label htmlFor="productName" className="block text-sm mb-2 dark:text-white">Product name</label>
                        <input 
                          onChange={handleOnChange}
                          value={data.productName}
                          autoFocus
                          autoComplete="off"
                          placeholder="Enter product name" 
                          type="text" 
                          id="productName" 
                          name="productName" 
                          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                    </div>
                </div>

                <div className="mb-4 sm:mb-8">
                    <label htmlFor="category" className="block text-sm mb-2 dark:text-white">Label</label>
                    <select
                      onChange={handleOnChange}
                      value={data.category}
                      id="category"
                      name="category"
                      className="py-3 px-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600">
                        <option>Select an category</option>
                        <option value="mobilePhone">Mobile Phone</option>
                        <option value="LaptopMacbok">Laptop & Macbook</option>
                        <option value="smartWatch">Smart Watch</option>
                        <option value="printer">Printer</option>
                        <option value="accessories">Accessories</option>
                    </select>
                </div>
        
                <div className="mb-4 sm:mb-8">
                    <div>
                        <label htmlFor="price" className="block text-sm mb-2 dark:text-white">Price</label>
                        <input
                            onChange={handleOnChange}
                            value={data.price}
                            autoComplete="off"
                            placeholder="Enter price" 
                            type="number" 
                            id="price" 
                            name="price" 
                            className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                    </div>
                </div>
        
                <div className="mb-4 sm:mb-8">
                  <label htmlFor="description" className="block text-sm mb-2 dark:text-white">Description</label>
                  <div className="mt-1">
                    <textarea
                        onChange={handleOnChange}
                        value={data.description}
                        id="description" 
                        name="description" 
                        rows="5" 
                        className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" 
                        placeholder="Enter description..."></textarea>
                  </div>
                </div>

                <div className="mb-4 sm:mb-8">
                    <label htmlFor="image" className="text-sm mb-2 dark:text-white h-40 w-full bg-slate-100 dark:bg-gray-800 dark:border-gray-700 border rounded flex items-center justify-center cursor-pointer"><BsCloudUpload className="w-8 h-8" /></label>
                    <input type="file" accept="image/*" id="image" onChange={previewImage} className="hidden"/>

                    {
                      data.previewImage && (
                        <div className="mb-2 flex justify-between items-center">
                          <div className="flex items-center gap-x-3">
                            <span className="w-8 h-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700">
                                <img src={data.previewImage} className="flex-shrink-0 w-5 h-5" alt="preview" />
                            </span>
                          <div>
                              <p className="text-sm font-medium text-gray-800 dark:text-white">FileName</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">Size</p>
                          </div>
                          </div>
                          <div className="inline-flex items-center gap-x-2">
                          <svg className="flex-shrink-0 w-4 h-4 text-teal-500" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </svg>
                          <button className="text-gray-500 hover:text-gray-800" onClick={removeReview}>
                              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                          </button>
                          </div>
                      </div>
                      )
                    }
                </div>
        
                <div className="mt-6 grid">
                  <button 
                    type="submit" 
                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                       { isLoading && (
                          <span className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                          )
                        }
                      Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    )
  }
  
  export default NewProduct