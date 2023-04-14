import { useCallback } from 'react'
import ApiService from '../ApiService'
import { endpoints } from '../endpoints'
import { ToastNotification } from '../../components'

export default function RekapitulasiController() {
  const rekapCommodity = useCallback(async (callback) => {
    ApiService.jsonRequest(
      endpoints.getRekapCommodity,
      {},
      (response) => {
        if (response.isError)
          ToastNotification({
            title: response.isError ? 'Kesalahan' : 'Berhasil',
            message: response.message,
            isError: response.isError
          })
        else {
          const { data } = response
          var result = {}
          data.map((items) => {
            var { comodity_nm, total_berat, total_kendaraan } = items
            total_berat = parseInt(total_berat, 10)
            total_kendaraan = parseInt(total_kendaraan, 10)
            switch (comodity_nm) {
              case 'TBS Inti':
              case 'TBS Plasma':
              case 'TBS Luar':
              case 'Brondolan':
              case 'USB':
                !result['TBS']
                  ? (result['TBS'] = { total_berat, total_kendaraan })
                  : (result['TBS'] = {
                      total_berat: result['TBS'].total_berat + total_berat,
                      total_kendaraan: result['TBS'].total_kendaraan + total_kendaraan
                    })
                break
              case 'Jangkos':
              case 'Others':
                !result['Others']
                  ? (result['Others'] = { total_berat, total_kendaraan })
                  : (result['Others'] = {
                      total_berat: result['Others'].total_berat + total_berat,
                      total_kendaraan: result['Others'].total_kendaraan + total_kendaraan
                    })
                break
              default:
                result[comodity_nm] = {
                  total_berat,
                  total_kendaraan
                }
                break
            }
            return ''
          })
          callback(result)
        }
      },
      []
    )
  }, [])

  const rekapTable = useCallback(async (callback) => {
    ApiService.jsonRequest(
      endpoints.getRekapTabel,
      {},
      (response) => {
        if (response.isError)
          ToastNotification({
            title: response.isError ? 'Kesalahan' : 'Berhasil',
            message: response.message,
            isError: response.isError
          })
        else callback(response.data)
      },
      []
    )
  }, [])
  return { rekapCommodity, rekapTable }
}
