import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import axios from "../axios";
import { useSelector } from "react-redux";
import Home from "../views/Home";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { email, password, confirmPassword } = data;

    if (!email || !password || !confirmPassword) {
      setIsLoading(false);
      toast.error('All inputs are require!')
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Password does not match!')
      return;
    }

    axios.post('/register', {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    })
    .then(function (response) {
      toast.success(response.data.message)
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    })
    .catch(function (error) {
      toast.error(error.response.data.message)
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  if (isAuthenticated) {
    return <Home />
  }

  return (
    <div className="h-full">
      <div className="dark:bg-slate-900 bg-gray-100 flex h-full items-center py-10">
        <div className="w-full max-w-md mx-auto p-2">
          <div className="mt-0 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign up
                </h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  You have account
                  <Link to={"/login"} className="text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 mx-2">
                    Sign in here
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                <button type="button" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                  <svg className="w-4 h-auto" width="46" height="47" viewBox="0 0 46 47" fill="none">
                    <path d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z" fill="#4285F4"/>
                    <path d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z" fill="#34A853"/>
                    <path d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z" fill="#FBBC05"/>
                    <path d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z" fill="#EB4335"/>
                  </svg>
                  Sign up with Google
                </button>

                <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">Or</div>
              
                <form onSubmit={handleRegister}>
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="block text-sm mb-2 dark:text-white">Email address</label>
                        <input 
                          autoFocus
                          autoComplete="off"
                          value={data.email}
                          onChange={handleOnChange}
                          placeholder="Enter your email" 
                          type="email" 
                          id="email" 
                          name="email" 
                          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                    </div>

                    <div>
                      <label htmlFor="password" className="block text-sm mb-2 dark:text-white">Password</label>
                        <input 
                          value={data.password}
                          onChange={handleOnChange}
                          placeholder="Enter your password" 
                          type="password" 
                          id="password" 
                          name="password" 
                          className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600" />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm mb-2 dark:text-white">Confirm Password</label>
                      <input 
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                        placeholder="Enter confirm password"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
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
                          Sign up
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

export default Register