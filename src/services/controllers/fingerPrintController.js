import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'

export default function FingerPrintController() {
  const fingerAuth = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.authFinger, {}, (response) => {
      if (response.is_error) {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.is_error
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  const fingerValidate = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.validateFinger, {}, (response) => {
      if (response.is_error)
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.is_error
        })
      else callback(response)
      loading(false)
    })
  }, [])

  const fingerInsert = useCallback((payload, loading) => {
    loading(true)
    ApiService.jsonRequest(endpoints.registerFinger, {...payload, created_by: 'Super Admin'}, (response) => {
      if (response.is_error)
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.is_error
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: 'User Baru Berhasil Ditambah',
          isError: response.is_error
        })
      }
      loading(false)
    })
  }, [])

  return { fingerAuth, fingerValidate, fingerInsert }
}
