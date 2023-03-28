import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'
import { setStore } from '../../helpers/utility'
import { useNavigate } from 'react-router-dom'

export default function FingerPrintController() {
  const navigate = useNavigate()

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

  const userBiometricDelete = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.deleteUserBiometric, payload, (response) => {
      if (response.isError)
        ToastNotification({
          title: 'Kesalahan',
          message: 'Gagal Menghapus Biometric Fingerprint',
          isError: response.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: 'Fingerprint Berhasil Dihapus',
          isError: response.isError
        })
        callback(false)
      }
      loading(false)
    })
  }, [])

  const userBiometricIdentify = useCallback(
    (loading) => {
      loading(true)
      ApiService.jsonRequest(endpoints.identifyUserBiometric, {}, (response) => {
        if (response.is_error || response.isError)
          ToastNotification({
            title: 'Kesalahan',
            message: 'Biometric Tidak Terdaftar',
            isError: response.isError
          })
        else {
          ToastNotification({
            title: 'Berhasil',
            message: `Selamat Datang ${response.data.nm}`,
            isError: response.isError
          })
          const accountInfo = {
            user: { nm: response.data.nm, cd: response.data.cd, bm: true }
          }
          setStore('isLogin', true)
          setStore('accountInfo', accountInfo)
          navigate('/', { replace: true })
        }
        loading(false)
      })
    },
    [navigate]
  )

  const userBiometricCreate = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.registerUserBiometric, payload, (response) => {
      if (response.isError)
        ToastNotification({
          title: 'Kesalahan',
          message: 'Gagal Menyimpan Biometric Fingerprint',
          isError: response.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: 'Pendaftaran Fingerprint Berhasil',
          isError: response.isError
        })
        callback(true)
      }
      loading(false)
    })
  }, [])

  return {
    fingerAuth,
    fingerValidate,
    fingerInsert,
    userBiometricDelete,
    userBiometricCreate,
    userBiometricIdentify
  }
}
