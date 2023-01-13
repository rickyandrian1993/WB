import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const GetCommodity = (callback) => {
  const queryGetCommodity = `
    SELECT cd, nm FROM mt_commodity
    WHERE is_delete = 'N' AND is_inactive = 'N' 
    ORDER BY nm`
  pool
    .query(queryGetCommodity)
    .then((res) =>
      callback({
        ...success200,
        data: res.rows
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Get Commodity: ${error}`
      })
    )
}

const InsertCommodity = (req, callback) => {
  let valueInsertCommodity = ''
  req.body.forEach((value) => {
    valueInsertCommodity += `(
      '${value.cd}',
      ${value.nm ? `'${value.nm}'` : null},
      ${value.created_by ? `'${value.created_by}'` : null},
      ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
      ${value.updated_by ? `'${value.updated_by}'` : null},
      ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
      ${value.is_delete ? `'${value.is_delete}'` : null},
      ${value.is_inactive ? `'${value.is_inactive}'` : null},
      ${value.is_mhc ? `'${value.is_mhc}'` : null}
    ),`
  })

  valueInsertCommodity = valueInsertCommodity.substring(0, valueInsertCommodity.length - 1)

  let insertComodityQuery = `
    INSERT INTO mt_commodity (
      cd, 
      nm, 
      created_by, 
      created_dt, 
      updated_by, 
      updated_dt, 
      is_delete, 
      is_inactive, 
      is_mhc
    ) VALUES ${valueInsertCommodity}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      nm = excluded.nm,
      created_by = excluded.created_by, 
      created_dt = excluded.created_dt, 
      updated_by = excluded.updated_by, 
      updated_dt = excluded.updated_dt, 
      is_delete = excluded.is_delete, 
      is_inactive = excluded.is_inactive, 
      is_mhc = excluded.is_mhc;`

  pool
    .query(insertComodityQuery)
    .then((_) =>
      callback({
        ...success200,
        data: 'Berhasil'
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: error
      })
    )
}

export { GetCommodity, InsertCommodity }
