import { error500, success200 } from '../constants/responseCallback.js'
import pool from '../dbconfig.js'

const CredentialList = (callback) => {
  const queryGetListCredential = `
    SELECT cd, nm, role_position FROM mt_fingerprint
    ORDER BY nm`
  pool
    .query(queryGetListCredential)
    .then((res) =>
      callback({
        ...success200,
        data: res.rows
      })
    )
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Get List Credential: ${error}`
      })
    )
}

const RemoveBiometric = (req, res) => {
  const { username } = req.body
  const removeBiometricQuery = `UPDATE pcc_app_user SET biometric = null WHERE cd = '${username}'`
  
  pool
    .query(removeBiometricQuery)
    .then((_) => res.json({ ...success200}))
    .catch((err) => res.status(500).json({ ...error500, data: err}))
}

export { CredentialList, RemoveBiometric }
