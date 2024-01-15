import axios from '../axios'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { formatCurrencyVND } from '../utils/helper'
import { IMAGE_BASE_URL } from '../utils/constant'

const OrderList = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      let response = await axios.get(`/user-orders`)

      setData(response.data.orders)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="px-4 py-10 sm:px-2 lg:px-8 lg:py-4">
      <div className="mx-auto max-w-3xl">
        <div className="relative z-10 mt-5 rounded-xl border bg-white p-4 sm:mt-10 md:p-10 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="inline-block min-w-full p-1.5 align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
                        >
                          Id
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
                        >
                          Status
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
                        >
                          Details
                        </th>

                        <th
                          scope="col"
                          className="px-6 py-3 text-start text-xs font-medium uppercase text-gray-500"
                        >
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {data.map((data) => (
                        <tr key={data._id}>
                          <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-800 dark:text-gray-200">
                            {data._id}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm font-bold uppercase text-blue-800 dark:text-blue-200">
                            {data.status}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-800 dark:text-gray-200">
                            {data.products.map((product) => (
                              <div key={product._id}>
                                <div className="rounded-md border p-4 text-sm text-gray-600 dark:text-gray-400">
                                  <div className="my-2 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={`${IMAGE_BASE_URL}${product.image}`}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>
                                  <p className="font-bold">{product.name}</p>
                                  <dl className="mt-3">
                                    <dt className="pt-3 font-semibold first:pt-0 dark:text-white">
                                      {formatCurrencyVND(product.price)}
                                    </dt>
                                    <dt className="pt-3 font-semibold first:pt-0 dark:text-white">
                                      Quantity: {product.quantity}
                                    </dt>

                                    <dt className="pt-3 font-semibold text-red-600 first:pt-0 dark:text-white">
                                      Total:{' '}
                                      {formatCurrencyVND(
                                        product.quantity * product.price,
                                      )}
                                    </dt>
                                  </dl>
                                </div>
                              </div>
                            ))}
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold uppercase text-red-600 dark:text-blue-200">
                            {formatCurrencyVND(data.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderList
