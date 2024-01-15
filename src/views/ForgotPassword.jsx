import { useState } from 'react'
import Button from '../components/Button'
import { z } from 'zod'
import { toast } from 'sonner'
import axios from '../axios'
import Input from '../components/Input'

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: '',
  })
  const [errors, setErrors] = useState({
    email: '',
  })
  const [isLoading, setIsLoading] = useState()

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

  const forgotPasswordSchema = z.object({
    email: z.string().email('Must be type of email'),
  })

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { email } = data

    try {
      forgotPasswordSchema.parse({ email })

      await axios
        .post('/forgot-password', {
          email: data.email,
        })
        .then(function (response) {
          setData({
            email: '',
          })
          toast.success(response.data.message)
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

  return (
    <div className="h-full">
      <div className="flex h-full items-center bg-gray-100 py-10 dark:bg-slate-900">
        <div className="mx-auto w-full max-w-md p-2">
          <div className="mt-0 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              <div className="text-center">
                <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                  Loss Your Password
                </h1>
              </div>

              <div className="mt-5">
                <form onSubmit={handleForgotPassword}>
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

                    <div className="my-3">
                      <Button
                        className={'w-full justify-center'}
                        isLoading={isLoading}
                      >
                        Send Link Reset Password
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

export default ForgotPassword
