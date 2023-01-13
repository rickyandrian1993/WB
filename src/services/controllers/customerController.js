/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function CustomerController() {
  const [customer, setCustomer] = useState([])

  useEffect(() => {
    ApiService.jsonRequest(endpoints.getCustomer, {}, (response) => {
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        const customers = []
        response.data.forEach((data) => {
          customers.push({ value: data.cd, label: data.nm })
        })
        setCustomer(customers)
      }
    })
  }, [])

  return { customer }
}
