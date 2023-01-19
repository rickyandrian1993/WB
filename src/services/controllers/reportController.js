import moment from 'moment'
import { useCallback } from 'react'
import { ToastNotification } from '../../components'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'

export default function ReportController() {
  const getReport = useCallback((payload, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(
      endpoints.getReport,
      {
        ...payload,
        startDate: moment(payload.startDate).format('Y-MM-DD'),
        endDate: moment(payload.endDate).format('Y-MM-DD')
      },
      (response) => {
        if (response.isError === true || response.isError === 'Y') {
          ToastNotification({
            title: 'Kesalahan',
            message: response.message,
            isError: response.isError
          })
        } else callback(response.data)
        loading(false)
      }
    )
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

  const uploadData = useCallback(async (payload, loading) => {
    loading(true)
    await ApiService.jsonRequest(endpoints.uploadData, payload, (response) => {
      if (response.isError === true || response.isError === 'Y') {
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      } else {
        ToastNotification({
          title: 'Berhasil',
          message: response.message,
          isError: response.isError
        })
      }
      loading(false)
    })
  }, [])

  return { getReport, getUploadList, uploadData }
}
