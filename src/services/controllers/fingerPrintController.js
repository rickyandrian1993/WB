import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'

export default function FingerPrintController() {
  const fingerAuth = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.authFinger, {}, (response) => {
      if (response.isError) {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  const fingerValidate = useCallback((loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.validateFinger, {}, (response) => {
      if (response.isError) {
        ToastNotification({
          title: 'Kesalahan',
          message: 'Fingerprint Tidak Terdaftar',
          isError: response.isError
        })
        callback(response)
      } else callback(response)
      loading(false)
    })
  }, [])

  const fingerInsert = useCallback(async (payload) => {
    ApiService.jsonRequest(
      endpoints.registerFinger,
      { ...payload, created_by: 'Super Admin' },
      (response) => {
        if (response.isError)
          ToastNotification({
            title: 'Kesalahan',
            message: response.data.message,
            isError: response.isError
          })
        else {
          ToastNotification({
            title: 'Berhasil',
            message: 'Pendaftaran Fingerprint Berhasil',
            isError: response.isError
          })
        }
      }
    )
  }, [])

  return { fingerAuth, fingerValidate, fingerInsert }
}
