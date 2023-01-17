import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function ReportController() {
  const getReport = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.getReport, { ...payload }, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  const getUploadList = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.getListUploadData, payload, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  const uploadData = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.uploadData, payload, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else callback(response.data)
      loading(false)
    })
  }, [])

  return { getReport, getUploadList, uploadData }
}
