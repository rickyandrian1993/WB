import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const FindDriver = async (data, callback) => {
  const { driver_cd, estate_cd } = data
  const findDriverQuery = `SELECT cd, nm FROM "pcc_worker" WHERE cd = '${driver_cd}' AND pcc_estate_cd = '${estate_cd}'`

  await pool
    .query(findDriverQuery)
    .then((res) => {
      if (res.rowCount === 0) callback({})
      else callback(res.rows[0])
    })
    .catch((error) => {
      console.error(`Error find driver: ${error}`)
      callback({})
    })
}

const FindLoader = async (data, callback) => {
  const { estate_cd, loader } = data
  if (loader) {
    const findLoaderQuery = `
      SELECT cd, nm 
      FROM pcc_worker 
      WHERE cd in ('${loader[0]}', '${loader[1]}', '${loader[2]}') 
        AND pcc_estate_cd = '${estate_cd}'
    `

    await pool
      .query(findLoaderQuery)
      .then((res) => {
        if (res.rowCount === 0) callback({})
        else {
          const loaderData = {
            loader1: res.rows.find((data) => data.cd === loader[0]) || {},
            loader2: res.rows.find((data) => data.cd === loader[1]) || {},
            loader3: res.rows.find((data) => data.cd === loader[2]) || {}
          }
          callback(loaderData)
        }
      })
      .catch((error) => {
        console.error(`Error find loader: ${error}`)
        callback({})
      })
  } else callback({})
}

const InsertWorker = (data, callback) => {
  let valueInsertWorker = ''
  data.forEach((value) => {
    valueInsertWorker += `(
        '${value.cd}',
        ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null},
        ${value.pcc_wkr_grp_cd ? `'${value.pcc_wkr_grp_cd}'` : null},
        ${value.worker_id ? `'${value.worker_id}'` : null},
        ${value.nm ? `'${value.nm.replace("'", "''")}'` : null},
        ${value.gender ? `'${value.gender}'` : null},
        ${value.phone ? `'${value.phone}'` : null},
        ${value.address ? `'${value.address.replace("'", "''")}'` : null},
        ${value.bpjs_no ? `'${value.bpjs_no}'` : null},
        ${value.created_by ? `'${value.created_by}'` : null},
        ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
        ${value.updated_by ? `'${value.updated_by}'` : null},
        ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
        ${value.version ? `${value.version}` : null},
        ${value.is_delete ? `'${value.is_delete}'` : null},
        ${value.is_inactive ? `'${value.is_inactive}'` : null},
        ${value.worker_kode ? `'${value.worker_kode.replace("'", "''")}'` : null}
      ),`
  })

  valueInsertWorker = valueInsertWorker.substring(0, valueInsertWorker.length - 1)

  let insertWorkerQuery = `INSERT INTO pcc_worker (
      cd, 
      pcc_estate_cd, 
      pcc_wkr_grp_cd, 
      worker_id, 
      nm, 
      gender, 
      phone, 
      address, 
      bpjs_no, 
      created_by, 
      created_dt, 
      updated_by, 
      updated_dt, 
      version, 
      is_delete, 
      is_inactive, 
      worker_kode
    ) VALUES ${valueInsertWorker}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      pcc_estate_cd = excluded.pcc_estate_cd,
      pcc_wkr_grp_cd = excluded.pcc_wkr_grp_cd, 
      worker_id = excluded.worker_id,
      nm = excluded.nm,
      gender = excluded.gender, 
      phone = excluded.phone, 
      address = excluded.address, 
      bpjs_no = excluded.bpjs_no, 
      created_by = excluded.created_by, 
      created_dt = excluded.created_dt, 
      updated_by = excluded.updated_by, 
      updated_dt = excluded.updated_dt, 
      version = excluded.version, 
      is_delete = excluded.is_delete, 
      is_inactive = excluded.is_inactive, 
      worker_kode = excluded.worker_kode;`

  pool
    .query(insertWorkerQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan worker.' }))
    .catch((error) => callback({ ...error500, data: `Error Insert Worker: ${error}` }))
}

export { FindDriver, FindLoader, InsertWorker }
