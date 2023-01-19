import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const GetReport = (data, callback) => {
  const { startDate, endDate } = data
  const commodity = data.commodity
  let page = data.page !== 'undefined' ? parseInt(data.page) : 1
  page === 0 ? (page = 1) : page
  const perPage = parseInt(data.perPage)
  const startIndex = (page - 1) * perPage
  const endIndex = page * perPage
  const results = {}
  const initialSelect = 'pcc_mill_yields_activity.*, pcc_customer.nm AS customer_nm'
  const initialCount = 'count(pcc_mill_yields_activity) as total'
  let queryData = ''
  let queryCount = ''

  if (commodity === 'all') {
    queryCount = `
      SELECT ${initialCount}
      FROM pcc_mill_yields_activity LEFT JOIN pcc_customer 
        ON pcc_mill_yields_activity.pcc_customer_cd = pcc_customer.cd
      WHERE pcc_mill_yields_activity.wb_arrive_dt::DATE
        BETWEEN '${startDate}' AND '${endDate}'
    `

    queryData = `
      SELECT ${initialSelect}
      FROM pcc_mill_yields_activity LEFT JOIN pcc_customer 
        ON pcc_mill_yields_activity.pcc_customer_cd = pcc_customer.cd
      WHERE pcc_mill_yields_activity.wb_arrive_dt::DATE
        BETWEEN '${startDate}' AND '${endDate}'
      OFFSET ${startIndex} rows fetch next ${perPage} rows only
    `
  } else {
    queryCount = `
      SELECT ${initialCount}
      FROM pcc_mill_yields_activity LEFT JOIN pcc_customer 
        ON pcc_mill_yields_activity.pcc_customer_cd = pcc_customer.cd
      WHERE mt_comodity_cd = '${commodity}' AND pcc_mill_yields_activity.wb_arrive_dt::DATE
        BETWEEN '${startDate}' AND '${endDate}'
    `

    queryData = `
      SELECT ${initialSelect}
      FROM pcc_mill_yields_activity LEFT JOIN pcc_customer 
        ON pcc_mill_yields_activity.pcc_customer_cd = pcc_customer.cd
      WHERE mt_comodity_cd = '${commodity}' AND pcc_mill_yields_activity.wb_arrive_dt::DATE
        BETWEEN '${startDate}' AND '${endDate}'
      OFFSET ${startIndex} rows fetch next ${perPage} rows only
    `
  }

  pool
    .query(queryCount)
    .then((res) => {
      const total = res.rows.length > 0 ? res.rows[0].total : 0
      pool
        .query(queryData)
        .then((response) => {
          if (endIndex < total) {
            results.next = {
              page: page + 1,
              limit: perPage
            }
          }
          if (startIndex > 0) {
            results.previous = {
              page: page - 1,
              limit: perPage
            }
          }
          results.total = total
          results.currentPage = page
          results.results = response.rows

          callback({ ...success200, data: results })
        })
        .catch((error) =>
          callback({
            ...error500,
            data: `Error Get Report: ${error}`
          })
        )
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Get Report: ${error}`
      })
    )
}

export { GetReport }
