const baseAPIUrlLocal = 'http://localhost:3335'
const baseAPIUrlLocalExternal = 'http://localhost:3336'
const baseAPIUrlLocalFingerPrint = 'http://localhost:3337'

export const endpoints = {
  /* API SERVER */
  fetchAppUser: `/appuser/wbSyncDataAppUser`,
  fetchCommodity: `/commodity/wbSyncDataCommodity`,
  fetchEstate: `/estate/wbSyncDataEstate`,
  fetchEstateLevel: `/estatelevel/wbSyncDataEstateLevel`,
  fetchPassword: `/appuser/wbSyncDataAppUserPass`,
  fetchVehicle: `/vehicle/wbSyncDataVehicle`,
  fetchVendor: `/vendorvehicle/wbSyncDataVndrVehicle`,
  fetchWorker: `/worker/wbSyncDataWorker`,
  getAllMill: `/pccmill/getAllMillNoSt`,
  getMillManager: `/millmanager/wbSyncGetMillManagerBaseOnMill`,
  getToken: `/auth/token-request`,
  loginServer: `/auth/login`,
  logoutServer: `/auth/logout`,

  /* API LOCAL */
  getCommodity: `${baseAPIUrlLocal}/commodity`,
  getConnectionOption: `${baseAPIUrlLocal}/serial/get-connection-options`,
  getCustomer: `${baseAPIUrlLocal}/customer`,
  getListUploadData: `${baseAPIUrlLocal}/sync`,
  getMillUser: `${baseAPIUrlLocal}/mill`,
  getReport: `${baseAPIUrlLocal}/report`,
  getReportData: `${baseAPIUrlLocal}/report/list`,
  getScaleHistory: `${baseAPIUrlLocal}/history/scale-in`,
  getTimbanganData: `${baseAPIUrlLocalExternal}/get-weigh`,
  getVendorVehicle: `${baseAPIUrlLocal}/vendor`,
  getSupplier: `${baseAPIUrlLocal}/supplier`,
  getVehicleList: `${baseAPIUrlLocal}/vehicle`,
  inputData: `${baseAPIUrlLocal}/input-data/insert`,
  insertCommodity: `${baseAPIUrlLocal}/commodity/insert`,
  insertCustomer: `${baseAPIUrlLocal}/customer/insert`,
  insertEstate: `${baseAPIUrlLocal}/estate/insert`,
  insertEstateLevel: `${baseAPIUrlLocal}/estate/insert-estate-level`,
  insertMill: `${baseAPIUrlLocal}/mill/insert`,
  insertPassword: `${baseAPIUrlLocal}/user/insert-password`,
  insertUser: `${baseAPIUrlLocal}/user/insert`,
  insertVehicle: `${baseAPIUrlLocal}/vehicle/insert`,
  insertVehicleLocal: `${baseAPIUrlLocal}/vehicle/insert-local`,
  insertVendor: `${baseAPIUrlLocal}/vendor/insert`,
  insertSupplier: `${baseAPIUrlLocal}/supplier/insert`,
  insertVehicleList: `${baseAPIUrlLocal}/vehicle/insert`,
  insertWorker: `${baseAPIUrlLocal}/worker/insert`,
  login: `${baseAPIUrlLocal}/login`,
  fingerSetting: `${baseAPIUrlLocal}/login/check-password`,
  credentialList: `${baseAPIUrlLocal}/credential/list`,
  mappingData: `${baseAPIUrlLocal}/mapping-data`,
  updateData: `${baseAPIUrlLocal}/input-data/update`,
  updateMill: `${baseAPIUrlLocal}/mill/update`,
  updateConnectionOption: `${baseAPIUrlLocal}/serial/update-connection-options`,
  uploadData: `${baseAPIUrlLocal}/sync/upload`,

  /* API NFC */
  readNfc: `${baseAPIUrlLocalExternal}/nfc`,

  /* API Finger Print */
  authFinger: `${baseAPIUrlLocalFingerPrint}/fingerprint/scan`,
  registerFinger: `${baseAPIUrlLocalFingerPrint}/fingerprint/insert`,
  validateFinger: `${baseAPIUrlLocalFingerPrint}/fingerprint/identify`,
  deleteUserBiometric: `${baseAPIUrlLocal}/credential/delete`,
  registerUserBiometric: `${baseAPIUrlLocalFingerPrint}/user/biometric/update`,
  identifyUserBiometric: `${baseAPIUrlLocalFingerPrint}/user/biometric/identify`,
}
