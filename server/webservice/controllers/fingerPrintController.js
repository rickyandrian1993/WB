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

export { CredentialList }
