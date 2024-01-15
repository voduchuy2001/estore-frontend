import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { toast } from 'sonner'
import { z } from 'zod'
import axios from '../axios'
import Home from './Home'
import { useSelector } from 'react-redux'

const ResetPassword = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const [data, setData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [isLoading, setIsLoading] = useState()
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

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

  const resetPasswordSchema = z
    .object({
      email: z.string().email('Must be type of email'),
      password: z.string().min(6, 'Password is required'),
      confirmPassword: z.string().min(6, 'Confirm password is required'),
    })
    .refine(({ confirmPassword, password }) => {
      if (confirmPassword !== password) {
        throw new z.ZodError([
          {
            code: 'custom',
            message: 'Password does not match',
            path: ['confirmPassword'],
          },
        ])
      }
      return true
    })

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    let { email, password, confirmPassword } = data

    try {
      resetPasswordSchema.parse({ email, password, confirmPassword })

      const currentUrl = window.location.href
      const url = new URL(currentUrl)
      const token = url.pathname.split('/reset-password/')[1]

      await axios
        .post(`/reset-password/`, { email, password, confirmPassword, token })
        .then(() => {
          toast.success('Your password has been updated')
          setData({
            email: '',
            password: '',
            confirmPassword: '',
          })
        })
        .catch(() => {
          toast.error('Failed to update password. Please try again.')
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
      toast.error(error.message)
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
                  Reset Your Password
                </h1>
              </div>

              <div className="mt-5">
                <form onSubmit={handleResetPassword}>
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

                    <Input
                      label={'Confirm Password'}
                      value={data.confirmPassword}
                      onChange={handleOnChange}
                      placeholder={'Enter your confirm password'}
                      type={'password'}
                      id={'confirmPassword'}
                      name={'confirmPassword'}
                      error={errors.confirmPassword}
                    />

                    <div className="my-3">
                      <Button
                        className={'w-full justify-center'}
                        isLoading={isLoading}
                      >
                        Reset Your Password
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

export default ResetPassword
