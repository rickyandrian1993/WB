/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function SupplierController() {
  const [supplier, setSupplier] = useState([])

  useEffect(() => {
    ApiService.jsonRequest(endpoints.getSupplier, {}, (response) => {
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        const suppliers = []
        response.data.forEach((data) => {
          suppliers.push({ value: data.cd, label: data.name })
        })
        setSupplier(suppliers)
      }
    })
  }, [])

  return { supplier }
}
