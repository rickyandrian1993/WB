export const allTrue = {
  after_cut: true,
  afdeling_nm: true,
  bjr: true,
  block_nm: true,
  block_nm2: true,
  block_nm3: true,
  comodity_nm: false,
  contract: true,
  created_by: true,
  created_dt: true,
  cut: true,
  dirt: true,
  do_date: true,
  do_number: true,
  dobi: true,
  driver_nm: true,
  disortasi_worker_cd: true,
  ekspedisi_nm: true,
  estate_nm: true,
  farmer: true,
  ffa: true,
  first_update: true,
  first_w: true,
  fresh_fruit: true,
  fresh_fruit_kg: true,
  garbage: true,
  garbage_kg: true,
  grade_class: true,
  grading_brondolan: true,
  grading_brondolan_kg: true,
  is_from_tph: true,
  is_lefted: true,
  janjang_kosong: true,
  janjang_kosong_kg: true,
  loader_nm: true,
  loader_nm_2: true,
  loader_nm_3: true,
  long_stalk: true,
  long_stalk_kg: true,
  mill_arrive_dt: true,
  mill_nm: true,
  moist: true,
  mt_vndr_rent_vhcle_cd: true,
  netto_w: true,
  overripe_brondolan: true,
  overripe_brondolan_kg: true,
  overripe_fruit: true,
  overripe_fruit_kg: true,
  pcc_customer_cd: true,
  pcc_mill_cd: true,
  pcc_estate_cd: true,
  pcc_estate_level_cd: true,
  pcc_estate_level_cd2: true,
  pcc_estate_level_cd3: true,
  pcc_evacuation_activity_cd: true,
  pcc_vehicle_cd: true,
  pcc_wrkr_cd_driver: true,
  pcc_wrkr_cd_loader: true,
  pcc_wrkr_cd_loader_2: true,
  pcc_wrkr_cd_loader_3: true,
  pv: true,
  remark1: true,
  restan_overnight: true,
  restan_overnight_kg: true,
  sand_fruit: true,
  sand_fruit_kg: true,
  seal_number: true,
  second_w: true,
  spb_date: true,
  spb_number: true,
  spb_weight: true,
  supplier: true,
  total_brondolan: true,
  total_bunch: true,
  total_loaded_nfc: true,
  updated_dt: true,
  updated_by: true,
  upload_flag: true,
  weight_gap: true,
  water: true,
  water_kg: true,
  wb_arrive_dt: true,
  wb_created_by: true,
  wb_created_dt: true,
  young_fruit: true,
  young_fruit_kg: true,
  // Button
  nfc_button: true
}

export const disableNonCommodity = {
  ...allTrue,
  contract: false,
  do_date: false,
  do_number: false,
  driver_nm: false,
  first_w: false,
  loader_nm: false,
  mt_vndr_rent_vhcle_cd: false,
  netto_w: false,
  pcc_customer_cd: false,
  pcc_vehicle_cd: false,
  remark1: false,
  seal_number: false,
  second_w: false,
  spb_date: false,
  spb_number: false,
  spb_weight: false,
  supplier: false
}

export const disableCommodity = {
  ...allTrue,
  dirt: false,
  dobi: false,
  driver_nm: false,
  ffa: false,
  loader_nm: false,
  moist: false,
  mt_vndr_rent_vhcle_cd: false,
  pcc_customer_cd: false,
  pcc_vehicle_cd: false,
  pv: false,
  remark1: false,
  seal_number: false,
  spb_weight: false,
  supplier: false
}

export const disableTbsInti = {
  ...allTrue,
  mt_vndr_rent_vhcle_cd: false,
  pcc_customer_cd: false,
  remark1: false,
  seal_number: false,
  spb_weight: false,
  supplier: false,
  nfc_button: false
}

export const disableTbsLain = {
  ...allTrue,
  driver_nm: false,
  farmer: false,
  grade_class: false,
  loader_nm: false,
  mt_vndr_rent_vhcle_cd: false,
  pcc_customer_cd: false,
  remark1: false,
  sand_fruit: false,
  seal_number: false,
  spb_weight: false,
  supplier: false,
  total_brondolan: false,
  total_bunch: false,
  water: false
}

const enableGrading = {
  fresh_fruit: false,
  garbage: false,
  grading_brondolan: false,
  janjang_kosong: false,
  long_stalk: false,
  overripe_brondolan: false,
  overripe_fruit: false,
  restan_overnight: false,
  young_fruit: false
}

export const findDisableList = (key, isFirst) => {
  switch (key) {
    case 'TBS Inti':
    case 'Brondolan':
      return { ...disableTbsInti }
    case 'TBS Plasma':
    case 'USB':
    case 'TBS Luar':
      return {
        ...disableTbsLain,
        ...(!isFirst ? enableGrading : null),
        comodity_nm: !isFirst,
        nfc_button: isFirst
      }
    case 'CPO':
    case 'Kernel':
    case 'CPKO':
    case 'CPKE':
    case 'RBDPO':
    case 'OLIEN':
    case 'Stearin':
    case 'PFAD':
      return { ...disableCommodity, comodity_nm: !isFirst }
    case 'Solar':
    case 'Solid':
    case 'Jangkos':
    case 'Cangkang':
    case 'Lain-lain':
      return { ...disableNonCommodity, comodity_nm: !isFirst }
    default:
      return allTrue
  }
}