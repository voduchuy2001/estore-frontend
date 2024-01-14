import axios from '../axios'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { clearCart } from '../redux/cartSlide'
import Button from '../components/Button'
import { z } from 'zod'
import Input from '../components/Input'

const Checkout = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const carts = useSelector((state) => state.product.cartItem)
  const dispatch = useDispatch()

  const [data, setData] = useState({
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
  })
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    address: '',
    phoneNumber: '',
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

  const phoneRegex =
    /^(?:\+84|0)(?:3[2-9]|5[2689]|7[06789]|8[1-9]|9[0-9])[0-9]{7}$/

  const checkoutSchema = z.object({
    name: z.string().min(6, 'Name is required'),
    email: z.string().email('Must be type of email'),
    address: z.string().min(6, 'Address is required'),
    phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),
  })

  const handleRedirectVNPay = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const { name, email, address, phoneNumber } = data

    try {
      checkoutSchema.parse({ name, email, address, phoneNumber })

      await axios
        .post('/redirect-vnpay', {
          email: data.email,
          name: data.name,
          address: address,
          phoneNumber: phoneNumber,
          productIds: carts.map((item) => [item._id, item.qty]),
        })
        .then(function (response) {
          dispatch(clearCart())
          window.location.href = response.data.url
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

  if (!carts.length) {
    return navigate('/')
  }

  return (
    <div className="h-full">
      <div className="flex h-full items-center bg-gray-100 py-10 dark:bg-slate-900">
        <div className="mx-auto w-full max-w-md p-2">
          <div className="mt-0 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              <div className="mt-5">
                <form onSubmit={handleRedirectVNPay}>
                  <div className="grid gap-y-4">
                    <div>
                      <Input
                        label={'Your Name'}
                        value={data.name}
                        onChange={handleOnChange}
                        placeholder={'Enter your name'}
                        type={'text'}
                        id={'name'}
                        name={'name'}
                        error={errors.name}
                      />
                    </div>

                    <div>
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
                    </div>

                    <div>
                      <Input
                        label={'Your Address'}
                        value={data.address}
                        onChange={handleOnChange}
                        placeholder={'Enter your address'}
                        type={'text'}
                        id={'address'}
                        name={'address'}
                        error={errors.address}
                      />
                    </div>

                    <div>
                      <Input
                        label={'Your Phone Number'}
                        value={data.phoneNumber}
                        onChange={handleOnChange}
                        placeholder={'Enter your phoneNumber'}
                        type={'text'}
                        id={'phoneNumber'}
                        name={'phoneNumber'}
                        error={errors.phoneNumber}
                      />
                    </div>

                    <div className="my-3">
                      <Button
                        className={'w-full justify-center'}
                        isLoading={isLoading}
                      >
                        Place Order
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

export default Checkout
