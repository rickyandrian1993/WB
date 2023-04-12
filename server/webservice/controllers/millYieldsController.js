import pool from '../dbconfig.js'
import moment from 'moment'
import { uid } from 'uid'
import { error500, success200 } from '../constants/responseCallback.js'

const getRekapHistory = async (req, res) => {
  const getAllScaleHistoryQuery = `
    SELECT comodity_nm, SUM(netto_w::bigint - cut::bigint) as total_berat, count(case when netto_w > 0 then null else 1 end) as total_kendaraan
    FROM pcc_mill_yields_activity
    WHERE wb_arrive_dt::date = now()::date
    GROUP BY comodity_nm`

  await pool
    .query(getAllScaleHistoryQuery)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((error) =>
      res.status(500).json({ ...error500, data: `Error Get Rekap History: ${error} ` })
    )
}

const getRekapHistorySupplier = async (req, res) => {
  const getAllScaleHistorySupplierQuery = `
    SELECT supplier, COUNT(cd) as total_kendaraan, SUM(netto_w::bigint - cut::bigint) as total_berat
    FROM pcc_mill_yields_activity
    WHERE wb_arrive_dt::date = now()::date AND netto_w > 0
    GROUP BY supplier`

  await pool
    .query(getAllScaleHistorySupplierQuery)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((error) =>
      res.status(500).json({ ...error500, data: `Error Get Rekap History: ${error} ` })
    )
}

const InsertMillYileds = (req, callback) => {
  const milLYieldData = req.body.data
  if (Object.keys(milLYieldData).length > 0) {
    const created_dt = milLYieldData.hasOwnProperty('created_dt')
      ? milLYieldData.created_dt
      : moment().format('Y-MM-DD')

    milLYieldData.cd = uid(32)
    const body = [],
      header = []
    for (const e in milLYieldData) {
      if (milLYieldData[e] === null || milLYieldData[e] === '') {
      } else {
        const tempHeader = `"${e}"`
        const temp = `'${milLYieldData[e]}'`
        header.push(tempHeader)
        body.push(temp)
      }
    }
    const insertMillYieldQuery = `INSERT INTO pcc_mill_yields_activity (${header}) VALUES (${body})`

    pool
      .query(insertMillYieldQuery)
      .then(() => {
        insertReport(created_dt)
        if (Object.keys(req.body.evac_act_dtl).length > 0) insertEvac(req.body.evac_act_dtl)
        callback({
          ...success200,
          message: 'Data timbangan pertama telah disimpan',
          data: 'Data timbangan pertama telah disimpan'
        })
      })
      .catch((error) =>
        callback({
          ...error500,
          data: `Error Insert Mill Yields: ${error}`
        })
      )
  } else
    callback({
      ...success200,
      data: 'Data Kosong.'
    })
}

const insertReport = (created_dt) => {
  const insertReportQuery = `
    INSERT INTO "report" ("tanggal", "record", "status")
      SELECT CAST("created_dt" as date), count("created_dt"), 'New'
      FROM "pcc_mill_yields_activity"
      WHERE CAST("created_dt" as date) = CAST('${created_dt}' as date)
      GROUP BY CAST("created_dt" as date)
    on conflict (tanggal) do
    UPDATE SET tanggal = excluded.tanggal, record = excluded.record, status = excluded.status;`

  pool
    .query(insertReportQuery)
    .then((_) => {})
    .catch((error) => console.error('Error Insert or Update Report', error))
}

const insertEvac = (data) => {
  let valueEvacActDtl = ''
  data.forEach((value) => {
    valueEvacActDtl += `(
      '${uid(32)}',
      ${value.pcc_estate_cd ? `'${value.pcc_estate_cd}'` : null},
      ${value.pcc_estate_level_cd ? `'${value.pcc_estate_level_cd}'` : null},
      ${value.pcc_evacuation_activity_cd ? `'${value.pcc_evacuation_activity_cd}'` : null},
      ${value.pcc_harvas_or_evact_cd ? `'${value.pcc_harvas_or_evact_cd}'` : null},
      ${value.created_dt ? `'${value.created_dt}'` : null},
      'N',
      'N',
      ${value.bunch_amount ? `${value.bunch_amount}` : null},
      ${value.brondolan ? `${value.brondolan}` : null},
      ${value.pcc_mill_cd ? `'${value.pcc_mill_cd}'` : null},
      ${value.is_from_tph ? `'${value.is_from_tph}'` : null},
      ${value.wb_arrive_dt ? `'${value.wb_arrive_dt}'` : null}
    ),`
  })

  valueEvacActDtl = valueEvacActDtl.substring(0, valueEvacActDtl.length - 1)

  const insertEvacActDtlQuery = `
    INSERT INTO pcc_evacuation_activity_dtl (
      cd,
      pcc_estate_cd,
      pcc_estate_level_cd, 
      pcc_evacuation_activity_cd,
      pcc_harvas_or_evact_cd, 
      created_dt,
      is_delete, 
      is_inactive,
      bunch_amount, 
      brondolan, 
      pcc_mill_cd, 
      is_from_tph,
      wb_arrive_dt
    ) VALUES ${valueEvacActDtl}`

  pool.query(insertEvacActDtlQuery).catch((error) => console.error('error insert evac', error))
}

const GetScaleHistory = (data, callback) => {
  const getAllScaleHistoryQuery = `
    SELECT * FROM pcc_mill_yields_activity 
    WHERE ((second_w is null OR second_w = 0) 
      AND (netto_w is null or netto_w = 0))`

  pool
    .query(getAllScaleHistoryQuery)
    .then((res) => callback({ ...success200, data: res.rows }))
    .catch((error) => callback({ ...error500, data: `Error Get Scale History: ${error} ` }))
}

const UpdateMillYields = (data, callback) => {
  const updateInputQuery = `
    UPDATE pcc_mill_yields_activity SET
      afdeling_nm = ${data.afdeling_nm === '' ? null : `'${data.afdeling_nm}'`},
      after_cut = ${data.after_cut === null ? 0 : data.after_cut},
      bjr = ${data.bjr === null ? 0 : data.bjr},
      block_nm = ${data.block_nm === '' ? null : `'${data.block_nm}'`},
      contract = ${data.contract === '' ? null : `'${data.contract}'`},
      cut = ${data.cut === null ? 0 : data.cut},
      dirt = ${data.dirt === null || data.dirt === undefined ? 0 : data.dirt},      
      disortasi_worker_cd = ${
        data.disortasi_worker_cd === '' ? null : `'${data.disortasi_worker_cd}'`
      },
      do_date = ${data.do_date === null ? null : `'${data.do_date}'`},
      do_number = ${data.do_number === '' ? null : `'${data.do_number}'`},
      dobi = ${data.dobi === null || data.dobi === undefined ? 0 : data.dobi},
      driver_nm = '${data.driver_nm}',
      ekspedisi_nm = '${data.ekspedisi_nm}',
      estate_nm = ${data.estate_nm === '' ? null : `'${data.estate_nm}'`},
      farmer = ${data.farmer === '' ? null : `'${data.farmer}'`},
      ffa = ${data.ffa === null || data.ffa === undefined ? 0 : data.ffa},
      first_update = '${data.first_update}',
      first_w = '${data.first_w}',
      fresh_fruit = ${
        data.fresh_fruit === null || data.fresh_fruit === undefined ? 0 : data.fresh_fruit
      },
      fresh_fruit_kg = ${data.fresh_fruit_kg === null ? 0 : data.fresh_fruit_kg},
      garbage = ${data.garbage === null || data.garbage === undefined ? 0 : data.garbage},
      garbage_kg = ${data.garbage_kg === null ? 0 : data.garbage_kg},
      grade_class = ${data.grade_class === '' ? null : `'${data.grade_class}'`},
      grading_brondolan = ${
        data.grading_brondolan === null || data.grading_brondolan === undefined
          ? 0
          : data.grading_brondolan
      },
      grading_brondolan_kg = ${data.grading_brondolan_kg === null ? 0 : data.grading_brondolan_kg},
      janjang_kosong = ${
        data.janjang_kosong === null || data.janjang_kosong === undefined ? 0 : data.janjang_kosong
      },
      janjang_kosong_kg = ${data.janjang_kosong_kg === null ? 0 : data.janjang_kosong_kg},
      loader_nm = ${data.loader_nm === '' ? null : `'${data.loader_nm}'`},
      loader_nm_2 = ${data.loader_nm_2 === '' ? null : `'${data.loader_nm_2}'`},
      loader_nm_3 = ${data.loader_nm_3 === '' ? null : `'${data.loader_nm_3}'`},
      long_stalk = ${
        data.long_stalk === null || data.long_stalk === undefined ? 0 : data.long_stalk
      },
      long_stalk_kg = ${data.long_stalk_kg === null ? 0 : data.long_stalk_kg},
      mill_nm = '${data.mill_nm}',
      moist = ${data.moist === null || data.moist === undefined ? 0 : data.moist},
      mt_vndr_rent_vhcle_cd = '${data.mt_vndr_rent_vhcle_cd}',
      netto_w = '${data.netto_w}',
      overripe_brondolan = ${
        data.overripe_brondolan === null || data.overripe_brondolan === undefined
          ? 0
          : data.overripe_brondolan
      },
      overripe_brondolan_kg = ${
        data.overripe_brondolan_kg === null ? 0 : data.overripe_brondolan_kg
      },
      overripe_fruit = ${
        data.overripe_fruit === null || data.overripe_fruit === undefined ? 0 : data.overripe_fruit
      },
      overripe_fruit_kg = ${data.overripe_fruit_kg === null ? 0 : data.overripe_fruit_kg},
      pcc_customer_cd = '${data.pcc_customer_cd}',
      pcc_vehicle_cd = '${data.pcc_vehicle_cd}',
      pcc_wrkr_cd_driver = ${
        data.pcc_wrkr_cd_driver === '' ? null : `'${data.pcc_wrkr_cd_driver}'`
      },
      pcc_wrkr_cd_loader = ${
        data.pcc_wrkr_cd_loader === '' ? null : `'${data.pcc_wrkr_cd_loader}'`
      },
      pcc_wrkr_cd_loader_2 = ${
        data.pcc_wrkr_cd_loader_2 === '' ? null : `'${data.pcc_wrkr_cd_loader_2}'`
      },
      pcc_wrkr_cd_loader_3 = ${
        data.pcc_wrkr_cd_loader_3 === '' ? null : `'${data.pcc_wrkr_cd_loader_3}'`
      },
      pv = ${data.pv === null || data.pv === undefined ? 0 : data.pv},
      remark1 = ${data.remark1 === '' ? null : `'${data.remark1}'`},
      restan_overnight = ${
        data.restan_overnight === null || data.restan_overnight === undefined
          ? 0
          : data.restan_overnight
      },
      restan_overnight_kg = ${data.restan_overnight_kg === null ? 0 : data.restan_overnight_kg},
      sand_fruit = ${
        data.sand_fruit === null || data.sand_fruit === undefined ? 0 : data.sand_fruit
      },
      sand_fruit_kg = ${data.sand_fruit_kg === null ? 0 : data.sand_fruit_kg},
      seal_number = ${data.seal_number === '' ? null : `'${data.seal_number}'`},
      second_w = '${data.second_w}',
      spb_date = ${data.spb_date === null ? null : `'${data.spb_date}'`},
      spb_number = ${data.spb_number === '' ? null : `'${data.spb_number}'`},
      spb_weight = ${
        data.spb_weight === null || data.spb_weight === undefined ? 0 : data.spb_weight
      },
      supplier = ${data.supplier === '' ? null : `'${data.supplier}'`},
      total_brondolan = ${
        data.total_brondolan === null || data.total_brondolan === undefined
          ? 0
          : data.total_brondolan
      },
      total_bunch = ${
        data.total_bunch === null || data.total_bunch === undefined ? 0 : data.total_bunch
      },
      updated_by = '${data.updated_by}',
      updated_dt = '${data.updated_dt}',
      upload_flag = '${data.upload_flag}',
      water = ${data.water === null || data.water === undefined ? 0 : data.water},
      water_kg = ${data.water_kg === null ? 0 : data.water_kg},
      young_fruit = ${
        data.young_fruit === null || data.young_fruit === undefined ? 0 : data.young_fruit
      },
      young_fruit_kg = ${data.young_fruit_kg === null ? 0 : data.young_fruit_kg}
    WHERE cd = '${data.cd}';
    `
  // const updateReportQuery = `UPDATE report SET status = 'New' WHERE tanggal::DATE = '${data.created_dt}';`

  pool
    .query(updateInputQuery)
    .then((_) =>
      callback({
        ...success200,
        data: 'Data telah di perbaharui.'
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Update Mill Yields: ${error} `
      })
    )
  // if (err) callback({ isError: true, message: err })
  // else {
  // pool.query(updateReportQuery, (err, _) => {
  //   if (err) console.error('Error', err)
  //   else callback({ isError: false, message: 'Data berhasil di ubah' })
  // })
  // }
  // })
}

export {
  getRekapHistory,
  getRekapHistorySupplier,
  GetScaleHistory,
  InsertMillYileds,
  UpdateMillYields
}
