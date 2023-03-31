import { deleteQuery } from '../constants/deleteAllQuery.js'
import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { InsertCustomer } from './customerController.js'

const GetMill = async (callback) => {
  const getMillQuery = `SELECT cd, nm, mill_manager FROM pcc_mill limit 1`
  const response = {}

  const mill = await pool.query(getMillQuery).catch((err) =>
    callback({
      ...error500,
      data: `Error Get Mill: ${err}`
    })
  )

  if (mill.rowCount < 1) callback({ ...success200, data: [] })

  const millDetail = await GetMillDetail(mill.rows[0].cd)
  const lastUpdate = await GetLastUpdate()

  response.mill = mill.rows[0]
  response.mill_detail = millDetail.rows
  response.update_data = lastUpdate.rowCount < 1 ? 0 : Date.parse(lastUpdate.rows[0].last_update)

  callback({ ...success200, data: response })
}

const GetMillDetail = async (cd) => {
  const queryGetMillDetail = `SELECT cd, pcc_estate_cd, pcc_estate_nm FROM pcc_mill_dtl WHERE pcc_mill_cd = '${cd}'`
  const result = pool
    .query(queryGetMillDetail)
    .catch((err) => console.error(`Error get mill detail: ${err}`))

  return result
}

const GetLastUpdate = () => {
  const updateDataQuery = 'SELECT * from update_data'
  const result = pool
    .query(updateDataQuery)
    .catch((err) => console.error(`Error get last update: ${err}`))

  return result
}

const InsertMill = (data, callback) => {
  /* Clearing all db if mill change */
  pool
    .query(deleteQuery)
    .then((_) => {
      // WBAgriSystemV2
      const insertPasswordAdmin = `INSERT INTO super_user (password) VALUES ('d8a5782a57931d630fad6017435712cc')`
      pool
        .query(insertPasswordAdmin)
        .catch((error) => console.error(`Error insert password admin: ${error}`))
      InsertMillData(data, callback)
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Delete Some Table Data: ${error}`
      })
    )
}

const InsertMillData = (data, callback) => {
  const insertMillQuery = `
  INSERT INTO pcc_mill (
    cd,
    nm,
    created_by,
    created_dt,
    updated_by,
    updated_dt,
    is_delete,
    is_inactive,
    is_load_st,
    load_typ_cd
  )
  VALUES (
    '${data.cd}',
    '${data.nm}',
    '${data.created_by}',
    '${new Date(data.created_dt).toISOString()}',
    ${data.updated_by ? `'${data.updated_by}'` : null},
    '${new Date(data.updated_dt).toISOString()}',
    ${data.is_delete ? `'${data.is_delete}'` : null},
    ${data.is_inactive ? `'${data.is_inactive}'` : null},
    '${data.is_load_st}',
    ${data.load_typ_cd ? `'${data.load_typ_cd}'` : null}
  )`
  pool
    .query(insertMillQuery)
    .then((_) => InsertMillDetailData(data.mill_dtl, callback))
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Insert Mill: ${error}`
      })
    )
}

const InsertMillDetailData = (data, callback) => {
  let millDetailValueQuery = ''
  data.forEach((value) => {
    millDetailValueQuery += `(
      '${value.cd}',
      ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null},
      ${value.pcc_estate_nm ? `'${value.pcc_estate_nm}'` : null},
      ${value.created_by ? `'${value.created_by}'` : null},
      ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
      ${value.pcc_mill_cd ? `'${value.pcc_mill_cd}'` : null}
    ),`
  })

  millDetailValueQuery = millDetailValueQuery.substring(0, millDetailValueQuery.length - 1)

  const insertMillDetail = `
    INSERT INTO pcc_mill_dtl (
      cd,
      pcc_estate_cd,
      pcc_estate_nm,
      created_by,
      created_dt,
      pcc_mill_cd)
    VALUES ${millDetailValueQuery};`

  pool
    .query(insertMillDetail)
    .then(() =>
      callback({
        ...success200,
        message: 'Berhasil update mill dan mill detai.',
        data: 'Berhasil update mill dan mill detail.'
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Insert Mill Detail Data: ${error}`
      })
    )
}

const UpdateMill = (data, callback) => {
  const { PccMill, cust, updateDate } = data
  const updateMillQuery = `
    UPDATE pcc_mill SET mill_manager = '${data.manager}'
    WHERE cd = '${PccMill.cd}'`
  pool
    .query(updateMillQuery)
    .then((_) => {
      if (cust.length > 0) InsertCustomer(cust)
      UpdateLastDateSync(updateDate)
      callback({
        ...success200,
        message: 'Mill berhasil di perbaharui.',
        data: 'Mill berhasil di perbaharui.'
      })
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Update Mill: ${error}`
      })
    )
}

const UpdateLastDateSync = (data) => {
  const newDate = new Date(data).toISOString()
  const getUpdateData = 'SELECT * FROM update_data'
  pool
    .query(getUpdateData)
    .then((res) => {
      let updateQuery = ''
      if (res.rowCount > 0) updateQuery = `UPDATE "update_data" SET last_update = '${newDate}'`
      else updateQuery = `INSERT INTO "update_data" ("last_update") VALUES ('${newDate}')`

      pool.query(updateQuery).catch((error) => console.error(`Error update data: ${error}`))
    })
    .catch((error) => console.error(`Error get update data: ${error}`))
}

export { GetMill, InsertMill, UpdateMill }
