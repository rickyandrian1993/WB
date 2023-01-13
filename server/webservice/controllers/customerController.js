import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const GetCustomer = (callback) => {
  const queryGetCustomer = `SELECT cd, nm FROM pcc_customer ORDER BY nm`
  pool
    .query(queryGetCustomer)
    .then((res) =>
      callback({
        ...success200,
        data: res.rows
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: error
      })
    )
}

const InsertCustomer = (data) => {
  let valueInsertCustomer = ''
  data.forEach((value) => {
    valueInsertCustomer += `(
        '${value.cd}',
        ${value.nm ? `'${value.nm}'` : null},
        ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null},
        ${value.mt_commodity_cd ? `'${value.mt_commodity_cd}'` : null},
        ${value.mt_city_cd ? `'${value.mt_city_cd}'` : null},
        ${value.mt_substate_cd ? `'${value.mt_substate_cd}'` : null},
        ${value.address ? `'${value.address.replace("'", "''")}'` : null},
        ${value.phone ? `'${value.phone}'` : null},
        ${value.owner_nm ? `'${value.owner_nm}'` : null},
        ${value.pic_nm ? `'${value.pic_nm}'` : null},
        ${value.pic_iid ? `'${value.pic_iid}'` : null},
        ${value.pic_iid_img ? `'${value.pic_iid_img}'` : null},
        ${value.email ? `'${value.email}'` : null},
        ${value.is_delete ? `'${value.is_delete}'` : null},
        ${value.is_inactive ? `'${value.is_inactive}'` : null},
        ${value.created_by ? `'${value.created_by}'` : null},
        ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
        ${value.updated_by ? `'${value.updated_by}'` : null},
        ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
        ${value.mt_commodity_nm ? `'${value.mt_commodity_nm}'` : null},
        ${value.mt_city_nm ? `'${value.mt_city_nm}'` : null},
        ${value.mt_substate_nm ? `'${value.mt_substate_nm}'` : null},
        ${value.pcc_mill_cd ? `'${value.pcc_mill_cd}'` : null}
      ),`
  })
  valueInsertCustomer = valueInsertCustomer.substring(0, valueInsertCustomer.length - 1)
  let insertCustomerQuery = `INSERT INTO pcc_customer (
      cd, 
      nm,
      pcc_estate_cd, 
      mt_commodity_cd,
      mt_city_cd, 
      mt_substate_cd,
      address, 
      phone,
      owner_nm, 
      pic_nm,
      pic_iid, 
      pic_iid_img,
      email, 
      is_delete,
      is_inactive, 
      created_by, 
      created_dt, 
      updated_by,  
      updated_dt,
      mt_commodity_nm, 
      mt_city_nm, 
      mt_substate_nm,
      pcc_mill_cd
    ) VALUES ${valueInsertCustomer}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      nm = excluded.nm, 
      pcc_estate_cd = excluded.pcc_estate_cd, 
      mt_commodity_cd = excluded.mt_commodity_cd, 
      mt_city_cd = excluded.mt_city_cd, 
      mt_substate_cd = excluded.mt_substate_cd, 
      address = excluded.address, 
      phone = excluded.phone, 
      owner_nm = excluded.owner_nm, 
      pic_nm = excluded.pic_nm, 
      pic_iid = excluded.pic_iid, 
      pic_iid_img = excluded.pic_iid_img, 
      email = excluded.email, 
      is_delete = excluded.is_delete, 
      is_inactive = excluded.is_inactive, 
      created_by = excluded.created_by, 
      created_dt = excluded.created_dt, 
      updated_by = excluded.updated_by, 
      updated_dt = excluded.updated_dt, 
      mt_commodity_nm = excluded.mt_commodity_nm, 
      mt_city_nm = excluded.mt_city_nm, 
      mt_substate_nm = excluded.mt_substate_nm,
      pcc_mill_cd = excluded.pcc_mill_cd;`

  pool.query(insertCustomerQuery).catch((error) => console.error(`Error insert customer: ${error}`))
}

export { GetCustomer, InsertCustomer }
