const deleteQuery = `
  DELETE FROM mt_commodity;
  DELETE FROM mt_vndr_rent_vhcle;
  DELETE FROM pcc_app_user;
  DELETE FROM pcc_app_user_access;
  DELETE FROM pcc_app_user_pass;
  DELETE FROM pcc_estate;
  DELETE FROM pcc_estate_level;
  DELETE FROM pcc_mill;
  DELETE FROM pcc_mill_dtl;
  DELETE FROM pcc_vehicle;
  DELETE FROM pcc_worker;
  DELETE FROM update_data;
`

export { deleteQuery }
