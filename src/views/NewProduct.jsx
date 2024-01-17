import { useState } from 'react'
import { toast } from 'sonner'
import axios from '../axios'
import { BsCloudUpload } from 'react-icons/bs'
import Home from '../views/Home'
import { useSelector } from 'react-redux'
import Button from '../components/Button'
import Input from '../components/Input'
import Textarea from '../components/Textarea'
import Select from '../components/Select'
import { z } from 'zod'

const NewProduct = () => {
  const [data, setData] = useState({
    productName: '',
    category: '',
    description: '',
    price: null,
    image: null,
    previewImage: null,
  })
  const [errors, setErrors] = useState({
    productName: '',
    category: '',
    description: '',
    price: null,
    image: null,
    previewImage: null,
  })
  const [isLoading, setIsLoading] = useState(false)
  const adminEmail = useSelector((state) => state.user.isAdmin)

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((pre) => ({
      ...pre,
      [name]: '',
    }))
  }

  const previewImage = (e) => {
    const image = e.target.files[0]
    setData((prev) => ({
      ...prev,
      image: image,
      previewImage: URL.createObjectURL(image),
    }))
  }

  const removeReview = () => {
    setData((pre) => ({
      ...pre,
      image: null,
      previewImage: null,
    }))
  }

  const MAX_FILE_SIZE = 1024 * 1024 * 5
  const ACCEPTED_IMAGE_MIME_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
  ]

  const newProductSchema = z.object({
    productName: z.string().min(1, { message: 'Name is required.' }),
    category: z.string().min(1, { message: 'Category is required.' }),
    description: z.string().min(1, { message: 'Description is required.' }),
    price: z.string().refine((value) => Number(value) >= 10000, {
      message: 'Price must be a number greater than or equal to 10000.',
    }),
    image: z
      .lazy(() =>
        z
          .object({
            name: z.string(),
            size: z.number(),
            type: z.string(),
          })
          .refine(
            (file) => file.size <= MAX_FILE_SIZE,
            `Max image size is 5MB.`,
          )
          .refine(
            (file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file.type),
            'Only .jpg, .jpeg, .png and .webp formats are supported.',
          ),
      )
      .nullable(),
  })

  const handleNewProduct = async (e) => {
    e.preventDefault()
    const { productName, category, price, description, image } = data

    try {
      setIsLoading(true)
      newProductSchema.parse({
        productName,
        category,
        price,
        description,
        image,
      })

      console.log(data)

      const response = await axios.post('/new-product', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      toast.success(response.data.message)
      setData({
        productName: '',
        category: '',
        description: '',
        price: '',
        image: null,
        previewImage: null,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [err.path[0]]: err.message,
          }))
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!adminEmail) {
    return <Home />
  }

  return (
    <div className="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-2xl">
        <div className="relative z-10 mt-5 rounded-xl border bg-white p-4 sm:mt-10 md:p-10 dark:border-gray-700 dark:bg-gray-800">
          <form onSubmit={handleNewProduct}>
            <div className="mb-4 sm:mb-8">
              <Input
                label={'Product Name'}
                error={errors.productName}
                value={data.productName}
                onChange={handleOnChange}
                placeholder={'Enter product name'}
                type={'text'}
                id={'productName'}
                name={'productName'}
              />
            </div>

            <div className="mb-4 sm:mb-8">
              <Select
                label="Label"
                value={data.category}
                onChange={handleOnChange}
                id="category"
                name="category"
                error={errors.category}
                options={[
                  { value: 'Mobile Phone', label: 'Mobile Phone' },
                  { value: 'Laptop & Macbok', label: 'Laptop & Macbook' },
                  { value: 'Smart Watch', label: 'Smart Watch' },
                  { value: 'Printer', label: 'Printer' },
                  { value: 'Accessories', label: 'Accessories' },
                ]}
              />
            </div>

            <div className="mb-4 sm:mb-8">
              <Input
                label={'Product Price'}
                value={data.price}
                onChange={handleOnChange}
                placeholder={'Enter product price'}
                type={'number'}
                id={'price'}
                name={'price'}
                error={errors.price}
              />
            </div>

            <div className="mb-4 sm:mb-8">
              <Textarea
                label="Description"
                error={errors.description}
                value={data.description}
                onChange={handleOnChange}
                id="description"
                name="description"
                rows={5}
                placeholder="Enter description..."
              />
            </div>

            <div className="mb-4 sm:mb-8">
              {data.previewImage ? (
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-x-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 dark:border-neutral-700">
                      <img
                        src={data.previewImage}
                        className="h-5 w-5 flex-shrink-0"
                        alt="preview"
                      />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        FileName
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        Size
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-x-2">
                    <svg
                      className="h-4 w-4 flex-shrink-0 text-teal-500"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <button
                      className="text-gray-500 hover:text-gray-800"
                      onClick={removeReview}
                    >
                      <svg
                        className="h-4 w-4 flex-shrink-0"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </div>

                  {errors.image && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <span className="font-medium">{errors.image}</span>
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 flex h-40 w-full cursor-pointer items-center justify-center rounded border bg-slate-100 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  >
                    <BsCloudUpload className="h-8 w-8" />
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    id="image"
                    onChange={previewImage}
                    className="hidden"
                    error={errors.image}
                  />
                </div>
              )}
            </div>

            <div className="mt-6 grid">
              <Button
                isLoading={isLoading}
                type={'submit'}
                className={'w-full justify-center'}
              >
                New Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
