import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'

export default function FingerPrintController() {
  const fingerAuth = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.authFinger, {}, (response) => {
      if (response.isError)
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else callback(response)
      loading(false)
    })
  }, [])

  return { fingerAuth }
}
