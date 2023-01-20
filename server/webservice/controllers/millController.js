import { deleteQuery } from '../constants/deleteAllQuery.js'
import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'
import { InsertCustomer } from './customerController.js'

const GetMill = (callback) => {
  const getMillQuery = `SELECT cd, nm, mill_manager FROM pcc_mill limit 1`
  const response = {}
  pool
    .query(getMillQuery)
    .then(async (resMill) => {
      response.mill = resMill.rowCount > 0 ? resMill.rows[0] : []
      if (resMill.rowCount > 0)
        await GetMillDetail(resMill, (res) => (response.mill_detail = res.rows))
      else response.mill_detail = []
      GetLastUpdate((res) => {
        response.update_data = res.update_data
        callback({ ...success200, data: response })
      })
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Get Mill: ${error}`
      })
    )
}

const GetMillDetail = async (millData, callback) => {
  const queryGetMillDetail = `SELECT * FROM pcc_mill_dtl WHERE pcc_mill_cd = '${millData.rows[0].cd}'`
  pool
    .query(queryGetMillDetail)
    .then((resMillDetail) => callback(resMillDetail))
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Get Mill Detail: ${error}`
      })
    )
}

const GetLastUpdate = (callback) => {
  const data = {}
  const updateDataQuery = 'SELECT * from update_data'
  pool
    .query(updateDataQuery)
    .then((resUpdateData) => {
      data.update_data =
        resUpdateData.rowCount === 0 ? 0 : Date.parse(resUpdateData.rows[0].last_update)
      callback(data)
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Get Update Data: ${error}`
      })
    )
}

const InsertMill = (data, callback) => {
  /* Clearing all db if mill change */
  // WBAgriSystemV2
  const insertPasswordAdmin = `UPDATE super_user SET password = 'd8a5782a57931d630fad6017435712cc'`
  pool.query(insertPasswordAdmin)
  pool
    .query(deleteQuery)
    .then((_) => InsertMillData(data, callback))
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
