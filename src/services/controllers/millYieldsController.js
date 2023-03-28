import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import ApiService from '../ApiService'
import { ToastNotification } from '../../components'
import { useNavigate } from 'react-router-dom'

export default function LoginController() {
  const navigate = useNavigate()

  const insertData = useCallback((body, loading, form) => {
    if (!body.data.first_w) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Timbangan pertama tidak boleh kosong',
        isError: true
      })
      return
    }

    loading(true)
    ApiService.jsonRequest(endpoints.inputData, body, (response) => {
      if (response.isError === true || response.isError === 'Y')
        ToastNotification({
          title: 'Kesalahan',
          message: response.message,
          isError: response.isError
        })
      else {
        ToastNotification({
          title: 'Berhasil',
          message: response.message,
          isError: response.isError
        })
        form.reset()
      }
      loading(false)
    })
  }, [])

  const updateData = useCallback(
    (body, loading) => {
      if (
        parseInt(body.first_w) === 0 ||
        parseInt(body.second_w) === 0 ||
        parseInt(body.netto_w) === 0
      ) {
        ToastNotification({
          title: 'Kesalahan',
          message: 'Data timbangan tidak boleh kosong',
          isError: true
        })
        return
      }
      loading(true)
      ApiService.jsonRequest(endpoints.updateData, body, (response) => {
        if (response.isError === true || response.isError === 'Y')
          ToastNotification({
            title: 'Kesalahan',
            message: response.message,
            isError: response.isError
          })
        else {
          ToastNotification({
            title: 'Berhasil',
            message: response.message,
            isError: response.isError
          })
          navigate('/print', { state: { type: 'TIKET', data: body } })
        }
        loading(false)
      })
    },
    [navigate]
  )

  const getScaleHistory = useCallback((body, loading, callback) => {
    loading(true)
    ApiService.jsonRequest(endpoints.getScaleHistory, body, (response) => {
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

  return { getScaleHistory, insertData, updateData }
}
