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

const GetReportList = (req, res) => {
  const params = req.body
  const { startDate, endDate } = params

  if (!startDate || startDate === 'Invalid date' || !endDate || endDate === 'Invalid date')
    return res.json({ ...success200, data: [] })

  switch (params.commodity) {
    case 'CPO':
    case 'Kernel':
    case 'CPKO':
    case 'CPKE':
    case 'RBDPO':
    case 'OLIEN':
    case 'Stearin':
      return getReportCommodity(res, params)
    case 'TBS Inti':
    case 'Brondolan':
      return getReportTbs(res, params)
    case 'TBS Plasma':
    case 'TBS Luar':
    case 'USB':
      return getReportTbsLuarPlasmaUsb(res, params)
    case 'Solar':
    case 'Solid':
    case 'Jangkos':
    case 'Cangkang':
    case 'Others':
      return getReportNonCommodity(res, params)
    case 'all':
      return getAllReportToday(res, params)
    default:
      return res.json({ ...success200, data: [] })
  }
}

const getAllReportToday = (res, params) => {
  const { startDate } = params

  const query = `
    SELECT comodity_nm, supplier, SUM(cut) as cut, SUM(first_w) as first_w,
      SUM(second_w) as second_w, SUM(netto_w) as netto_w, SUM(total_bunch) as tandan,
      estate_nm, (SUM(netto_w)::bigint - SUM(cut)::bigint) as total_netto,
      SUM(spb_weight) as spb_weight, COUNT(cd) as trip
    FROM pcc_mill_yields_activity
    WHERE second_w <> 0 AND wb_arrive_dt::DATE = '${startDate}'
    GROUP BY comodity_nm, supplier, estate_nm`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => {
      console.log('err', err)
      res.status(500).json({ ...error500, data: err })
    })
}

const getReportTbs = (res, params) => {
  const { commodity, startDate, endDate, supplier, estate } = params

  const query = `
    SELECT
      comodity_nm, supplier, cut, mill_arrive_dt,
      first_update, first_w, do_number, spb_number,
      second_w, netto_w, total_bunch as tandan, ekspedisi_nm,
      do_date, pcc_vehicle_cd, pmya.pcc_estate_level_cd,
      pel.divisi_cd, pel.section_cd, pel.subblock_cd, estate_nm,
      (netto_w::bigint - cut::bigint) as total_netto, pc.nm as customer, spb_weight,
      CASE WHEN spb_weight::bigint > 0 THEN (netto_w::bigint - cut::bigint) - spb_weight ELSE 0 END as selisih
    FROM pcc_mill_yields_activity pmya
      LEFT JOIN pcc_estate_level pel ON pmya.pcc_estate_level_cd = pel.cd
      LEFT JOIN pcc_customer pc ON pmya.pcc_customer_cd = pc.cd
    WHERE (second_w <> 0 AND mt_comodity_cd = '${commodity}') AND 
      (pmya.wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}') ${
    supplier && `AND (supplier = '${supplier}' ${estate && `AND pcc_estate_cd = '${estate}'`})`
  }
    ORDER BY first_update DESC`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => res.status(500).json({ ...error500, data: err }))
}

const getReportTbsLuarPlasmaUsb = (res, params) => {
  const { commodity, startDate, endDate, supplier, estate } = params

  const query = `
    SELECT
      comodity_nm, grade_class, supplier, cut, mill_arrive_dt,
      first_update, first_w, do_number, spb_number,
      second_w, netto_w, total_bunch as tandan, ekspedisi_nm,
      do_date, pcc_vehicle_cd, estate_nm,
      (netto_w::bigint - cut::bigint) as total_netto, spb_weight,
      CASE WHEN spb_weight::bigint > 0 THEN (netto_w::bigint - cut::bigint) - spb_weight ELSE 0 END as selisih
    FROM pcc_mill_yields_activity       
    WHERE (second_w <> 0 AND mt_comodity_cd = '${commodity}') AND 
      (wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}') ${
    supplier && `AND (supplier = '${supplier}' ${estate && `AND pcc_estate_cd = '${estate}'`})`
  }
    ORDER BY first_update DESC`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => res.status(500).json({ ...error500, data: err }))
}

const getReportCommodity = (res, params) => {
  const { commodity, startDate, endDate, supplier, customer } = params

  if (supplier === '' || customer === '') return res.json({ ...success200, data: [] })

  const query = `
    SELECT comodity_nm, supplier, cut, mill_arrive_dt, first_update,
      first_w, do_number, spb_number, second_w, netto_w, total_bunch as tandan,
      ekspedisi_nm, do_date, pcc_vehicle_cd, pmya.pcc_estate_level_cd,
      pel.divisi_cd, pel.section_cd, pel.subblock_cd, estate_nm,
      (netto_w::bigint - cut::bigint) as total_netto, pc.nm as customer, spb_weight
    FROM pcc_mill_yields_activity pmya
      LEFT JOIN pcc_estate_level pel ON pmya.pcc_estate_level_cd = pel.cd
      LEFT JOIN pcc_customer pc ON pmya.pcc_customer_cd = pc.cd
    WHERE (second_w <> 0 AND 
      mt_comodity_cd = '${commodity}') AND 
      (pmya.wb_arrive_dt::DATE 
        BETWEEN '${startDate}' AND '${endDate}') AND 
      (pc.cd = '${customer}' AND supplier = '${supplier}')
    ORDER BY first_update DESC`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => res.status(500).json({ ...error500, data: err }))
}

const getReportNonCommodity = (res, params) => {
  const { commodity, startDate, endDate } = params

  const query = `
    SELECT supplier, pc.nm as customer, SUM(cut) as cut, SUM(first_w) as first_w,
      SUM(second_w) as second_w, SUM(netto_w) as netto_w, SUM(total_bunch) as tandan,
      (SUM(netto_w)::bigint - SUM(cut)::bigint) as total_netto,
      SUM(spb_weight) as spb_weight, COUNT(pmya.cd) as trip
    FROM pcc_mill_yields_activity pmya
      LEFT JOIN pcc_customer pc ON pmya.pcc_customer_cd = pc.cd
    WHERE (second_w <> 0 AND comodity_nm = '${commodity}') AND
      (pmya.wb_arrive_dt::DATE BETWEEN '${startDate}' AND '${endDate}')
    GROUP BY supplier, pc.nm`

  pool
    .query(query)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => res.status(500).json({ ...error500, data: err }))
}

export { GetReport, GetReportList }
