import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const FindEstate = async (data, callback) => {
  const { estate_cd } = data
  const findEstateQuery = `SELECT cd, nm FROM pcc_estate WHERE cd = '${estate_cd}'`

  await pool
    .query(findEstateQuery)
    .then((res) => {
      if (res.rowCount === 0) callback({})
      else callback(res.rows[0])
    })
    .catch((error) => {
      console.log(`Error find estate: ${error}`)
      callback({})
    })
}

const FindEstateLevel = async (data, callback) => {
  const { estate_cd, estate_level } = data

  if (estate_level) {
    const findEstateLevelQuery = `
    SELECT cd, divisi_cd, section_cd, subblock_cd 
    FROM pcc_estate_level 
    WHERE cd in ('${estate_level[0]}', '${estate_level[1]}', '${estate_level[2]}') 
      AND estate_cd = '${estate_cd}'
  `

    await pool
      .query(findEstateLevelQuery)
      .then((res) => {
        if (res.rowCount === 0) callback({})
        else {
          const estateLevelData = {
            estate_level1: res.rows.find((data) => data.cd === estate_level[0]) || {},
            estate_level2: res.rows.find((data) => data.cd === estate_level[1]) || {},
            estate_level3: res.rows.find((data) => data.cd === estate_level[2]) || {}
          }
          callback(estateLevelData)
        }
      })
      .catch((error) => {
        console.log(`Error find estate level: ${error}`)
        callback({})
      })
  } else callback({})
}

const InsertEstate = (data, callback) => {
  let valueInsertEstate = ''
  data.forEach((value) => {
    valueInsertEstate += `(
      '${value.cd}',
      ${value.nm ? `'${value.nm}'` : null},
      ${value.mt_country_cd ? `'${value.mt_country_cd}'` : null},
      ${value.mt_country_nm ? `'${value.mt_country_nm}'` : null},
      ${value.mt_region_cd ? `'${value.mt_region_cd}'` : null},
      ${value.mt_region_nm ? `'${value.mt_region_nm}'` : null},
      ${value.created_by ? `'${value.created_by}'` : null},
      ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
      ${value.updated_by ? `'${value.updated_by}'` : null},
      ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
      ${value.pcc_corp_group_cd ? `'${value.pcc_corp_group_cd}'` : null},
      ${value.is_delete ? `'${value.is_delete}'` : null},
      ${value.is_inactive ? `'${value.is_inactive}'` : null},
      ${value.pcc_corp_group_nm ? `'${value.pcc_corp_group_nm}'` : null},
      ${value.pcc_corp_cd ? `'${value.pcc_corp_cd}'` : null},
      ${value.pcc_corp_nm ? `'${value.pcc_corp_nm}'` : null}
    ),`
  })
  valueInsertEstate = valueInsertEstate.substring(0, valueInsertEstate.length - 1)
  const insertEstateQuery = `INSERT INTO pcc_estate (
      cd, 
      nm, 
      mt_country_cd, 
      mt_country_nm, 
      mt_region_cd, 
      mt_region_nm, 
      created_by, 
      created_dt, 
      updated_by, 
      updated_dt, 
      pcc_corp_group_cd, 
      is_delete, 
      is_inactive, 
      pcc_corp_group_nm, 
      pcc_corp_cd, 
      pcc_corp_nm
    ) VALUES ${valueInsertEstate}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      nm = excluded.nm,
      mt_country_cd = excluded.mt_country_cd,
      mt_country_nm = excluded.mt_country_nm,
      mt_region_cd = excluded.mt_region_cd,
      mt_region_nm = excluded.mt_region_nm,
      created_by = excluded.created_by,
      created_dt = excluded.created_dt,
      updated_by = excluded.updated_by,
      updated_dt = excluded.updated_dt,
      is_delete = excluded.is_delete,
      is_inactive = excluded.is_inactive,
      pcc_corp_group_nm = excluded.pcc_corp_group_nm,
      pcc_corp_cd = excluded.pcc_corp_cd,
      pcc_corp_nm = excluded.pcc_corp_nm;`

  pool
    .query(insertEstateQuery)
    .then((_) =>
      callback({
        ...success200,
        data: 'Berhasil menambahkan estate.'
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Insert Estate: ${error}`
      })
    )
}

const InsertEstateLevel = (data, callback) => {
  let valueInsertEstateLevel = ''
  data.forEach((value) => {
    valueInsertEstateLevel += `(
        '${value.cd}',
        ${value.estate_cd ? `'${value.estate_cd}'` : null},
        ${value.divisi_cd ? `'${value.divisi_cd}'` : null},
        ${value.section_cd ? `'${value.section_cd}'` : null},
        ${value.subblock_cd ? `'${value.subblock_cd}'` : null},
        ${value.shelf_from ? `${value.shelf_from}` : null},
        ${value.created_by ? `'${value.created_by}'` : null},
        ${value.created_dt ? `'${new Date(value.created_dt).toISOString()}'` : null},
        ${value.updated_by ? `'${value.updated_by}'` : null},
        ${value.updated_dt ? `'${new Date(value.updated_dt).toISOString()}'` : null},
        ${value.shelf_to ? `${value.shelf_to}` : null},
        ${value.is_delete ? `'${value.is_delete}'` : null},
        ${value.is_inactive ? `'${value.is_inactive}'` : null},
        ${value.tph_from ? `${value.tph_from}` : null},
        ${value.tph_to ? `${value.tph_to}` : null}
      ),`
  })
  valueInsertEstateLevel = valueInsertEstateLevel.substring(0, valueInsertEstateLevel.length - 1)
  let insertEstateLevelQuery = `INSERT INTO pcc_estate_level (
      cd, 
      estate_cd, 
      divisi_cd, 
      section_cd, 
      subblock_cd, 
      shelf_from, 
      created_by, 
      created_dt, 
      updated_by, 
      updated_dt, 
      shelf_to, 
      is_delete, 
      is_inactive, 
      tph_from, 
      tph_to
    ) VALUES ${valueInsertEstateLevel}
    on conflict (cd) do 
    UPDATE SET
      cd = excluded.cd,
      estate_cd = excluded.estate_cd, 
      divisi_cd = excluded.divisi_cd, 
      section_cd = excluded.section_cd, 
      subblock_cd = excluded.subblock_cd, 
      shelf_from = excluded.shelf_from, 
      created_by = excluded.created_by, 
      created_dt = excluded.created_dt, 
      updated_by = excluded.updated_by, 
      updated_dt = excluded.updated_dt, 
      shelf_to = excluded.shelf_to, 
      is_delete = excluded.is_delete, 
      is_inactive = excluded.is_inactive, 
      tph_from = excluded.tph_from, 
      tph_to = excluded.tph_to;`

  pool
    .query(insertEstateLevelQuery)
    .then((_) =>
      callback({
        ...success200,
        data: 'Berhasil menambahkan estate level'
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Insert Estate Level: ${error}`
      })
    )
}

export { FindEstate, FindEstateLevel, InsertEstate, InsertEstateLevel }
