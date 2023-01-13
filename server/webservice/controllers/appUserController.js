import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const InsertUser = (data, callback) => {
  let valueInsertAppUser = ''
  let valueInsertUserAccess = ''
  data.forEach((value) => {
    valueInsertAppUser += `(
      '${value.cd}',
      ${value.nm ? `'${value.nm}'` : null},
      ${value.niid ? `'${value.niid}'` : null},
      ${value.phone ? `'${value.phone}'` : null},
      ${value.address ? `'${value.address}'` : null},
      ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null},
      ${value.created_by ? `'${value.created_by}'` : null},
      ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
      ${value.updated_by ? `'${value.updated_by}'` : null},
      ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
      ${value.is_delete ? `'${value.is_delete}'` : null},
      ${value.is_inactive ? `'${value.is_inactive}'` : null},
      ${value.is_admin ? `'${value.is_admin}'` : null},
      ${value.tier ? `'${value.tier}'` : null}
    ),`

    if (value.user_access.length > 0) {
      value.user_access.forEach((access) => {
        valueInsertUserAccess += `(
          '${access.cd}',
          ${access.pcc_app_user_cd ? `'${access.pcc_app_user_cd}'` : null},
          ${access.mt_app_section_cd ? `'${access.mt_app_section_cd}'` : null},
          ${access.created_by ? `'${access.created_by}'` : null},
          ${access.created_dt ? `'${new Date(access.created_dt).toISOString()}'` : null},
          ${access.mt_app_services_cd ? `'${access.mt_app_services_cd}'` : null}
        ),`
      })
    }
  })
  valueInsertAppUser = valueInsertAppUser.substring(0, valueInsertAppUser.length - 1)
  valueInsertUserAccess = valueInsertUserAccess.substring(0, valueInsertUserAccess.length - 1)
  const insertAppUserQuery = `INSERT INTO pcc_app_user (
    cd,
    nm,
    niid,
    phone,
    address,
    pcc_estate_cd,
    created_by,
    created_dt,
    updated_by,
    updated_dt,
    is_delete,
    is_inactive,
    is_admin,
    tier
  ) VALUES ${valueInsertAppUser}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    nm = excluded.nm,
    niid = excluded.niid,
    phone = excluded.phone,
    address = excluded.address,
    pcc_estate_cd = excluded.pcc_estate_cd,
    created_by = excluded.created_by,
    created_dt = excluded.created_dt,
    updated_by = excluded.updated_by,
    updated_dt = excluded.updated_dt,
    is_delete = excluded.is_delete,
    is_inactive = excluded.is_inactive,
    is_admin = excluded.is_admin,
    tier = excluded.tier;`

  pool
    .query(insertAppUserQuery)
    .then((_) => InsertUserAccess(valueInsertUserAccess, callback))
    .catch((error) => callback({ ...error500, data: `Error Insert App User: ${error}` }))
}

const InsertUserAccess = (data, callback) => {
  const insertAppUserAccessQuery = `INSERT INTO pcc_app_user_access (
    cd,
    pcc_app_user_cd,
    mt_app_section_cd,
    created_by,
    created_dt,
    mt_app_services_cd
  ) VALUES ${data}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    pcc_app_user_cd = excluded.pcc_app_user_cd,
    mt_app_section_cd = excluded.mt_app_section_cd,
    created_by = excluded.created_by,
    created_dt = excluded.created_dt,
    mt_app_services_cd = excluded.mt_app_services_cd;`
  pool
    .query(insertAppUserAccessQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan app user access.' }))
    .catch((error) => callback({ ...error500, data: `Error Insert App User Access: ${error}` }))
}

const InsertPassword = (data, callback) => {
  let valueInsertAppPassword = ''
  data.forEach((value) => {
    valueInsertAppPassword += `(
        '${value.pcc_app_user_cd}',
        ${value.password ? `'${value.password}'` : null},
        ${value.created_by ? `'${value.created_by}'` : null},
        ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
        ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null}
      ),`
  })

  valueInsertAppPassword = valueInsertAppPassword.substring(0, valueInsertAppPassword.length - 1)

  const insertAppUserPassQuery = `INSERT INTO pcc_app_user_pass (
    pcc_app_user_cd,
    password, 
    created_by,
    created_dt, 
    pcc_estate_cd
  ) VALUES ${valueInsertAppPassword}
  on conflict (pcc_app_user_cd) do 
  UPDATE SET
    pcc_app_user_cd = excluded.pcc_app_user_cd,
    password = excluded.password,
    created_by = excluded.created_by,
    created_dt = excluded.created_dt,
    pcc_estate_cd = excluded.pcc_estate_cd;`

  pool
    .query(insertAppUserPassQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan App user password.' }))
    .catch((error) => callback({ ...error500, data: `Error Insert App User Password: ${error}` }))
}

export { InsertUser, InsertPassword }
