import { useState } from 'react'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import axios from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../redux/userSlice'
import Home from '../views/Home'
import Button from '../components/Button'
import Input from '../components/Input'

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const [isLoading, setIsLoading] = useState()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      }
    })
    setErrors((pre) => ({
      ...pre,
      [name]: '',
    }))
  }

  const loginSchema = z.object({
    email: z.string().email('Must be type of email'),
    password: z.string().min(6, 'Password is required'),
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { email, password } = data

    try {
      loginSchema.parse({ email, password })

      await axios
        .post('/login', {
          email: data.email,
          password: data.password,
        })
        .then(function (response) {
          toast.success(response.data.message)
          dispatch(login(response.data))
          setTimeout(() => {
            navigate('/')
          }, 1000)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } catch (error) {
      setIsLoading(false)
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [err.path[0]]: err.message,
          }))
        })
      }
      toast.error(error.response.data.message)
    }
  }

  const handleRedirectGoogleOAuth2 = async () => {
    try {
      await axios.get('/redirect/auth-google').then((response) => {
        window.location.href = response.data.url
      })
    } catch (error) {
      toast.error(error)
    }
  }

  if (isAuthenticated) {
    return <Home />
  }

  return (
    <div className="h-full">
      <div className="flex h-full items-center bg-gray-100 py-10 dark:bg-slate-900">
        <div className="mx-auto w-full max-w-md p-2">
          <div className="mt-0 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Sign in
                </h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Do not have an account yet?
                  <Link
                    to={'/register'}
                    className="mx-2 font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleRedirectGoogleOAuth2}
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                >
                  <svg
                    className="h-auto w-4"
                    width="46"
                    height="47"
                    viewBox="0 0 46 47"
                    fill="none"
                  >
                    <path
                      d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                      fill="#34A853"
                    />
                    <path
                      d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                      fill="#EB4335"
                    />
                  </svg>
                  Sign in with Google
                </button>

                <div className="flex items-center py-3 text-xs uppercase text-gray-400 before:me-6 before:flex-[1_1_0%] before:border-t before:border-gray-200 after:ms-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 dark:text-gray-500 dark:before:border-gray-600 dark:after:border-gray-600">
                  Or
                </div>

                <form onSubmit={handleLogin}>
                  <div className="grid gap-y-4">
                    <Input
                      label={'Email'}
                      value={data.email}
                      onChange={handleOnChange}
                      placeholder={'Enter your email'}
                      type={'email'}
                      id={'email'}
                      name={'email'}
                      error={errors.email}
                    />

                    <Input
                      label={'Password'}
                      value={data.password}
                      onChange={handleOnChange}
                      placeholder={'Enter your password'}
                      type={'password'}
                      id={'password'}
                      name={'password'}
                      error={errors.password}
                    />

                    <div className="my-3">
                      <Button
                        className={'w-full justify-center'}
                        isLoading={isLoading}
                      >
                        Sign In
                      </Button>
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

export default Login
