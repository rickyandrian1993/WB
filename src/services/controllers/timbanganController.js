import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'

export default function LoginController() {
  const getTimbanganData = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.getTimbanganData, {}, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else callback(response.data)
      loading(false)
    })
  }, [])

  return { getTimbanganData }
}
