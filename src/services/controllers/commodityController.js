/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function CommodityController() {
  const [commodity, setCommodity] = useState([])

  useEffect(() => {
    ApiService.jsonRequest(endpoints.getCommodity, {}, (response) => {
      if (response.isError)
        ToastNotification({
          title: response.isError ? 'Kesalahan' : 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      else {
        const commodities = []
        response.data.forEach((data) => {
          commodities.push({ value: data.cd, label: data.nm })
        })
        setCommodity(commodities)
      }
    })
  }, [])

  return { commodity }
}
