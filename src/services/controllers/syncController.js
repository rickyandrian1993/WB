import { useCallback } from 'react'
import { endpoints } from '../endpoints'
import { ToastNotification } from '../../components'
import { getStore } from '../../helpers/utility'
import { payloadServer } from '../../constants/basePayload'
import ApiService from '../ApiService'
import Login from './loginController'
import moment from 'moment'

export default function SyncController() {
  const { getToken, loginServer, logoutServer } = Login()

  const fetchAppUser = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchAppUser, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchAppUser, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchAppUserPassword = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchPassword, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchPassword, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchEstate = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        pcc_estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchEstate, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              pcc_estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchEstate, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchEstateLevel = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(
      url + endpoints.fetchEstateLevel,
      basePayload,
      async (response) => {
        if (response.isError === 'N') {
          result.push(response.data.resultSet)
          while (response.data?.total >= total) {
            const payload = {
              page: page + counter,
              per_page: 100,
              paramMap: {
                date: date,
                estate_cd: estateCd
              }
            }
            const basePayload = payloadServer(username, payload)
            await ApiService.jsonRequest(
              url + endpoints.fetchEstateLevel,
              basePayload,
              (response) => {
                result.push(response.data.resultSet)
              }
            )
            total += 100
            counter++
          }
        }
        callback(result.flat())
      }
    )
  }, [])

  const fetchVehicle = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchVehicle, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchVehicle, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchVendor = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchVendor, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchVendor, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchWorker = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchWorker, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchWorker, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchCommodity = useCallback(async (url, username, date, estateCd, callback) => {
    let page = 1,
      counter = 1,
      total = 100
    const result = []
    const payload = {
      page: page,
      per_page: 100,
      paramMap: {
        date: date,
        estate_cd: estateCd
      }
    }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.fetchCommodity, basePayload, async (response) => {
      if (response.isError === 'N') {
        result.push(response.data.resultSet)
        while (response.data?.total >= total) {
          const payload = {
            page: page + counter,
            per_page: 100,
            paramMap: {
              date: date,
              estate_cd: estateCd
            }
          }
          const basePayload = payloadServer(username, payload)
          await ApiService.jsonRequest(url + endpoints.fetchCommodity, basePayload, (response) => {
            result.push(response.data.resultSet)
          })
          total += 100
          counter++
        }
      }
      callback(result.flat())
    })
  }, [])

  const fetchMillManager = useCallback(async (url, username, millCd, callback) => {
    const payload = { cd: millCd }
    const basePayload = payloadServer(username, payload)
    await ApiService.jsonRequest(url + endpoints.getMillManager, basePayload, (response) => {
      callback(response.data)
    })
  }, [])

  const sendDataToLocal = async (url, data) => {
    let payload = []
    for (let i = 0; i < data.length; i++) {
      payload.push(data[i])
      if ((i !== 0 && i % 50 === 0) || i === data.length - 1) {
        ApiService.jsonRequest(url, payload, () => {})
        payload = []
      }
    }
  }

  const syncData = useCallback(
    async (body, loading) => {
      loading(true)
      const { mill, mill_detail, server_url, update_data } = getStore('mill')
      const estate = []

      mill_detail?.forEach(async (data) => {
        estate.push(data.pcc_estate_cd)
      })

      if (mill === null || mill_detail === null || mill_detail === undefined) {
        ToastNotification({
          title: 'Kesalahan',
          message: 'Mill belum ada atau belum terdaftar.',
          isError: true
        })
        loading(false)
        return
      }

      try {
        for (let i = 0; i < mill_detail.length; i++) {
          getToken(server_url, loading, async (tokenResponse) => {
            const payload = {
              locale: 'en_US',
              agent: 'mozzila',
              user: {},
              data: {
                username: body.username,
                estateCd: mill_detail[i].pcc_estate_cd,
                response: body.password,
                token_request: tokenResponse.data.token_request
              }
            }
            loginServer(server_url, payload, async (loginResponse) => {
              if (loginResponse.isError === 'Y' && i === mill_detail.length - 1) {
                ToastNotification({
                  title: 'Kesalahan',
                  message: loginResponse.message,
                  isError: true
                })
                loading(false)
              } else {
                await fetchAppUser(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertUser, res)
                })
                await fetchAppUserPassword(
                  server_url,
                  body.username,
                  update_data,
                  estate,
                  (res) => {
                    sendDataToLocal(endpoints.insertPassword, res)
                  }
                )
                await fetchCommodity(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertCommodity, res)
                })
                await fetchEstate(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertEstate, res)
                })
                await fetchEstateLevel(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertEstateLevel, res)
                })
                await fetchVehicle(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertVehicle, res)
                })
                await fetchVendor(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertVendor, res)
                })
                await fetchWorker(server_url, body.username, update_data, estate, (res) => {
                  sendDataToLocal(endpoints.insertWorker, res)
                })
                await fetchMillManager(server_url, body.username, mill.cd, async (res) => {
                  const createdDate = moment().format('Y-MM-DD')
                  const payload = {
                    ...res,
                    updateDate: createdDate
                  }
                  await ApiService.jsonRequest(endpoints.updateMill, payload, () => {})
                })
                await logoutServer(
                  server_url,
                  body.username,
                  mill_detail[i].pcc_estate_cd,
                  () => {}
                )
                setTimeout(() => {
                  ToastNotification({
                    title: 'Berhasil',
                    message: 'Berhasil Update Data',
                    isError: false
                  })
                }, 2000)
                loading(false)
                window.location.reload()
              }
            })
          })
        }
      } catch (error) {
        loading(false)
      }
    },
    [
      fetchAppUser,
      fetchAppUserPassword,
      fetchCommodity,
      fetchEstate,
      fetchEstateLevel,
      fetchMillManager,
      fetchVehicle,
      fetchVendor,
      fetchWorker,
      getToken,
      loginServer,
      logoutServer
    ]
  )

  return { syncData }
}
