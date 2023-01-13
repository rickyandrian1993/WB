import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const GetVehicle = (req, callback) => {}

const InsertVehicle = (data, callback) => {
  let valueInsertVehicle = ''
  data.forEach((value) => {
    valueInsertVehicle += `(
      '${value.cd}',
      ${value.asset_no ? `'${value.asset_no}'` : null},
      ${value.mt_vehicle_kind_cd ? `'${value.mt_vehicle_kind_cd}'` : null},
      ${value.ownership ? `'${value.ownership}'` : null},
      ${value.capacity ? `${value.capacity}` : null},
      ${value.engine_no ? `'${value.engine_no}'` : null},
      ${value.insurance_no ? `'${value.insurance_no}'` : null},
      ${value.owned_dt ? `'${new Date(value.owned_dt).toISOString()}'` : null},
      ${value.remark ? `'${value.remark}'` : null},
      ${value.created_by ? `'${value.created_by}'` : null},
      ${value.updated_by ? `'${value.updated_by}'` : null},
      ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
      ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
      ${value.version ? `${value.version}` : null},
      ${value.is_delete ? `'${value.is_delete}'` : null},
      ${value.is_inactive ? `'${value.is_inactive}'` : null},
      ${value.document_no ? `'${value.document_no}'` : null},
      ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null}
    ),`
  })

  valueInsertVehicle = valueInsertVehicle.substring(0, valueInsertVehicle.length - 1)

  let insertVehicleQuery = `INSERT INTO pcc_vehicle (
    cd, 
    asset_no,
    mt_vehicle_kind_cd, 
    ownership,
    capacity, 
    engine_no,
    insurance_no, 
    owned_dt,
    remark, 
    created_by, 
    updated_by,  
    created_dt, 
    updated_dt,
    version, 
    is_delete,
    is_inactive, 
    document_no, 
    pcc_estate_cd
  ) VALUES ${valueInsertVehicle}
  on conflict (cd) do 
  UPDATE SET
    cd = excluded.cd,
    asset_no = excluded.asset_no, 
    mt_vehicle_kind_cd = excluded.mt_vehicle_kind_cd, 
    ownership = excluded.ownership, 
    capacity = excluded.capacity, 
    engine_no = excluded.engine_no, 
    insurance_no = excluded.insurance_no, 
    owned_dt = excluded.owned_dt, 
    remark = excluded.remark, 
    created_by = excluded.created_by, 
    created_dt = excluded.created_dt, 
    updated_by = excluded.updated_by, 
    updated_dt = excluded.updated_dt, 
    is_delete = excluded.is_delete, 
    is_inactive = excluded.is_inactive, 
    version = excluded.version, 
    pcc_estate_cd = excluded.pcc_estate_cd, 
    document_no = excluded.document_no;`

  pool
    .query(insertVehicleQuery)
    .then((_) => callback({ ...success200, data: 'Berhasil menambahkan kendaraan.' }))
    .catch((error) => callback({ ...error500, data: `Error Insert Vehicle: ${error}` }))
}

export { GetVehicle, InsertVehicle }
