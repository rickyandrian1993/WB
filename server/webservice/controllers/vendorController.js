import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const GetVendor = (req, callback) => {
  const { estateList } = req.body
  const queryGetVendor = `
    SELECT cd, nm FROM mt_vndr_rent_vhcle 
    WHERE (is_delete = 'N' AND is_inactive = 'N') AND pcc_estate_cd in (${estateList.map(
      (data) => `'${data.estateCd.toString()}'`
    )})
    ORDER BY nm`

  pool
    .query(queryGetVendor)
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

const InsertVendor = (data, callback) => {
  let valueInsertVendor = ''
  data.forEach((value) => {
    valueInsertVendor += `(
        '${value.cd}',
        ${value.nm ? `'${value.nm}'` : null},
        ${value.created_by ? `'${value.created_by}'` : null},
        ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
        ${value.remark ? `'${value.remark}'` : null},
        ${value.updated_by ? `'${value.updated_by}'` : null},
        ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
        ${value.is_delete ? `'${value.is_delete}'` : null},
        ${value.is_inactive ? `'${value.is_inactive}'` : null},
        ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null}
      ),`
  })

  valueInsertVendor = valueInsertVendor.substring(0, valueInsertVendor.length - 1)

  let insertVendorQuery = `INSERT INTO mt_vndr_rent_vhcle (
    cd, 
    nm, 
    created_by, 
    created_dt, 
    remark,  
    updated_by, 
    updated_dt, 
    is_delete, 
    is_inactive, 
    pcc_estate_cd
  ) VALUES ${valueInsertVendor}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    nm = excluded.nm, 
    created_by = excluded.created_by, 
    created_dt = excluded.created_dt, 
    remark = excluded.remark, 
    updated_by = excluded.updated_by, 
    updated_dt = excluded.updated_dt, 
    is_delete = excluded.is_delete, 
    is_inactive = excluded.is_inactive, 
    pcc_estate_cd = excluded.pcc_estate_cd;`

  pool
    .query(insertVendorQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan vendor.' }))
    .catch((error) => callback({ ...error500, data: `Error Insert Vendor: ${error}` }))
}

export { GetVendor, InsertVendor }
