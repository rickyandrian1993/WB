import moment from 'moment'
import { ToastNotification } from '../components'
import { commoditySubmenu, menu, nonCommoditySubmenu } from '../constants/sideMenuData'

export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') content = JSON.stringify(content)
  return window.localStorage.setItem(name, content)
}

export const getStore = (name) => {
  if (!name) return
  return JSON.parse(window.localStorage.getItem(name))
}

export const removeStore = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

export const removeAllLocalStorage = () => {
  return window.localStorage.clear()
}

export const getEstateList = () => {
  const estate = []
  const { mill_detail } = getStore('mill')

  mill_detail.forEach((data) => {
    estate.push({ estateCd: data.pcc_estate_cd, estateNm: data.pcc_estate_nm })
  })

  return estate
}

export const getDateAndTimeNow = (formatStr) => {
  return moment().format(formatStr)
}

export const dateFormat = (date, formatStr) => {
  return moment(date).format(formatStr)
}

export const numberFormat = (value) => {
  const nf = Intl.NumberFormat('id-ID')
  return nf.format(+value)
}

export const findLabelPath = (path) =>
  commoditySubmenu.find((x) => x.path === path) ??
  nonCommoditySubmenu.find((x) => x.path === path) ??
  menu.find((x) => x.path === path) ??
  'Weigh Bridge'

export const findPathByCd = (cd) =>
  commoditySubmenu.find((x) => x.cd === cd) ??
  nonCommoditySubmenu.find((x) => x.cd === cd) ??
  menu.find((x) => x.cd === cd) ??
  'Weigh Bridge'

export const getLastMonthDate = () => {
  const date = new Date()
  const prevMonth = date.getMonth() - 1
  const firstDay = 1

  return new Date(date.getFullYear(), prevMonth, firstDay)
}

export const generateHeader = (header) => {
  let columnHeader = []
  Object.keys(header).map((name) => {
    if (name !== 'actions') {
      let label = header[name]
      let key = name
      columnHeader.push({ label, key })
    }
    return null
  })
  return columnHeader
}

export const nfcParse = async (isGrading, data, evac_cd, resultCallback) => {
  const { mill } = getStore('mill')
  const result = []
  const parent = data.split('|')[0]
  const dataParent = parent.split(';')

  const nfcIndicator = dataParent[0]
  const pcc_mill_cd = dataParent[9]
  if (nfcIndicator !== '33' && nfcIndicator !== '34')
    ToastNotification({
      title: 'NFC Error',
      message: 'Kartu NFC tidak dikenal!',
      isError: true
    })
  else if (nfcIndicator === '33' && mill.cd !== pcc_mill_cd) {
    ToastNotification({
      title: 'NFC Error',
      message: 'Mill Berbeda',
      isError: true
    })
  } else if (nfcIndicator === '33' && !isGrading) {
    const childData = []
    const child = data.split('|')[1]
    const dataChild = child.split(';')

    const childDataLength = child.split('~')
    for (let i = 0; i < childDataLength.length; i++) {
      const splitData = childDataLength[i].split(';')

      childData.push({
        pcc_estate_cd: dataParent[3],
        pcc_estate_level_cd: splitData[1],
        pcc_evacuation_activity_cd: splitData[4],
        pcc_harvas_or_evact_cd: splitData[0],
        created_dt: moment.unix(dataParent[13] / 1000).format('Y-MM-DD HH:mm:ss'),
        bunch_amount: splitData[2],
        brondolan: splitData[3],
        pcc_mill_cd: dataParent[9],
        is_from_tph: dataParent[12],
        wb_arrive_dt: moment().format('Y-MM-DD HH:mm:ss')
      })
    }
    result.push({
      nfc_id: dataParent[0],
      pcc_evacuation_activity_cd: dataParent[1],
      pcc_evac_prnt_actv_cd: dataParent[2],
      pcc_estate_cd: dataParent[3],
      pcc_wrkr_cd_loader: dataParent[4],
      pcc_wrkr_cd_loader_2: dataParent[5],
      pcc_wrkr_cd_loader_3: dataParent[6],
      pcc_wrkr_cd_driver: dataParent[7],
      pcc_vehicle_cd: dataParent[8],
      pcc_mill_cd: dataParent[9],
      pcc_mill_is_load_st: dataParent[10],
      is_lefted: dataParent[11],
      is_from_tph: dataParent[12],
      date: dataParent[13],
      total_loaded_nfc: dataParent[14],
      total_bunch: dataParent[15],
      total_brondolan: dataParent[16],
      mill_nm: mill.nm,
      driver_cd: dataParent[7],
      estate_level_cd: dataChild[1],
      loader_cd: [dataParent[4], dataParent[5], dataParent[6]],
      child_data: childData
    })
    resultCallback(...result)

    const { child_data, pcc_estate_cd, loader_cd, driver_cd } = result[0]
    return {
      estate_level_cd: [child_data?.map(({ pcc_estate_level_cd }) => pcc_estate_level_cd)],
      pcc_estate_cd,
      loader_cd,
      driver_cd
    }
  } else if (nfcIndicator === '34' && isGrading) {
    if (dataParent[5] === evac_cd) {
      result.push({
        disortasi_worker_cd: dataParent[8],
        fresh_fruit: dataParent[9],
        overripe_fruit: dataParent[10],
        young_fruit: dataParent[11],
        long_stalk: dataParent[12],
        janjang_kosong: dataParent[13],
        grading_brondolan: dataParent[14],
        overripe_brondolan: dataParent[15],
        restan_overnight: dataParent[16],
        garbage: dataParent[17]
      })
      resultCallback(...result)
      return null
    } else if (!evac_cd) {
      ToastNotification({
        title: 'NFC Error',
        message: 'Silahkan Pilih No Kendaraan!',
        isError: true
      })
    } else {
      ToastNotification({
        title: 'NFC Error',
        message: 'Kartu NFC Evakuasi tidak sesuai!',
        isError: true
      })
    }
    return null
  } else
    ToastNotification({
      title: 'NFC Error',
      message: 'Kartu NFC salah!',
      isError: true
    })
}

export const isNaNToZero = (val) => {
  if (isNaN(parseInt(val))) {
    return 0
  } else {
    return val
  }
}

export const parseValue = (data, form) => {
  form.setValues({
    ...data,
    after_cut: isNaNToZero(data.after_cut),
    bjr: isNaNToZero(data.bjr),
    cut: isNaNToZero(data.cut),
    dirt: isNaNToZero(parseInt(data.dirt)),
    do_date: data.do_date !== '' ? new Date(data.do_date) : null,
    dobi: isNaNToZero(parseInt(data.dobi)),
    ffa: isNaNToZero(parseFloat(data.ffa)),
    first_w: isNaNToZero(parseInt(data.first_w)),
    fresh_fruit: isNaNToZero(parseInt(data.fresh_fruit)),
    fresh_fruit_kg: isNaNToZero(data.fresh_fruit_kg),
    janjang_kosong: isNaNToZero(parseInt(data.janjang_kosong)),
    janjang_kosong_kg: isNaNToZero(data.janjang_kosong_kg),
    garbage: isNaNToZero(parseFloat(data.garbage)),
    garbage_kg: isNaNToZero(data.garbage_kg),
    grading_brondolan: isNaNToZero(parseFloat(data.grading_brondolan)),
    grading_brondolan_kg: isNaNToZero(data.grading_brondolan_kg),
    long_stalk: isNaNToZero(parseInt(data.long_stalk)),
    long_stalk_kg: isNaNToZero(data.long_stalk_kg),
    moist: isNaNToZero(parseFloat(data.moist)),
    netto_w: isNaNToZero(parseInt(data.netto_w)),
    restan_overnight: isNaNToZero(parseFloat(data.restan_overnight)),
    restan_overnight_kg: isNaNToZero(data.restan_overnight_kg),
    overripe_fruit: isNaNToZero(parseInt(data.overripe_fruit)),
    overripe_fruit_kg: isNaNToZero(data.overripe_fruit_kg),
    overripe_brondolan: isNaNToZero(parseFloat(data.overripe_brondolan)),
    overripe_brondolan_kg: isNaNToZero(data.overripe_brondolan_kg),
    pv: isNaNToZero(parseFloat(data.pv)),
    sand_fruit: isNaNToZero(parseInt(data.sand_fruit)),
    sand_fruit_kg: isNaNToZero(data.sand_fruit_kg),
    second_w: isNaNToZero(parseInt(data.second_w)),
    spb_date: data.spb_date !== '' ? new Date(data.spb_date) : null,
    spb_weight: isNaNToZero(parseInt(data.spb_weight)),
    total_brondolan: isNaNToZero(parseInt(data.total_brondolan)),
    total_bunch: isNaNToZero(parseInt(data.total_bunch)),
    water: isNaNToZero(parseFloat(data.water)),
    water_kg: isNaNToZero(data.water_kg),
    young_fruit: isNaNToZero(parseInt(data.young_fruit)),
    young_fruit_kg: isNaNToZero(data.young_fruit_kg)
  })
}

export const trimPayload = (payload, parity) => {
  const result = {}
  Object.keys(payload).map((items) => {
    if (parity.find((e) => e === items)) {
      result[items] = payload[items]
    }
    return null
  })
  return result
}
