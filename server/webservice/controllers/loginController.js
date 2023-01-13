import md5 from 'md5'
import pool from '../dbconfig.js'
import { error500, success200, error403 } from '../constants/responseCallback.js'

const SALT = 'WIDEAGRI-2021%098765432'

const Login = async (req, callback) => {
  const { username, password } = req
  if (username.trim().length === 0 || password.trim().length === 0)
    callback({
      ...error403,
      data: 'Username atau password tidak boleh kosong.'
    })
  else CheckUserExist(req, callback)
}

const CheckUserExist = (data, callback) => {
  const checkUserExistQuery = `SELECT * FROM pcc_app_user WHERE cd = '${data.username}'`
  pool
    .query(checkUserExistQuery)
    .then((res) => {
      res.rowCount === 0
        ? callback({
            ...error403,
            message: 'User tidak terdaftar.',
            data: 'User tidak terdaftar.'
          })
        : CheckUsernameAndPasswordInDB(data, res.rows[0].pcc_estate_cd, callback)
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Check User Exist: ${error}`
      })
    )
}

const CheckUsernameAndPasswordInDB = (data, estateCd, callback) => {
  const hashing = md5(data.username + SALT + data.password + estateCd + SALT)
  const checkUsernameAndPasswordQuery = `
    SELECT au.cd, au.nm FROM "pcc_app_user_pass" aup 
      JOIN "pcc_app_user" au ON aup.pcc_app_user_cd = au.cd 
    WHERE aup."password" = '${hashing}' AND aup."pcc_app_user_cd" = '${data.username}'`
  pool
    .query(checkUsernameAndPasswordQuery)
    .then((res) => {
      res.rowCount === 0
        ? callback({
            ...error403,
            message: 'Username atau password salah.',
            data: 'Username atau password salah.'
          })
        : CheckUserAccess(res.rows[0], callback)
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Check Username and Password: ${error}`
      })
    )
}

const CheckUserAccess = (userData, callback) => {
  const checkUserAccessQuery = `
    SELECT * FROM "pcc_app_user_access"
    WHERE "pcc_app_user_cd" = '${userData.cd}' AND "mt_app_section_cd" = 'JEMBATAN_TIMBANG'`
  pool
    .query(checkUserAccessQuery)
    .then((res) => {
      res.rowCount === 0
        ? callback({
            ...error403,
            message: 'User tidak memiliki akses.',
            data: 'User tidak memiliki akses.'
          })
        : callback({
            ...success200,
            message: `Selamat datang di sistem jembatan timbang ${userData.nm}.`,
            data: {
              user: {
                cd: userData.cd,
                nm: userData.nm
              }
            }
          })
    })
    .catch((error) =>
      callback({
        ...error500,
        data: `Error Check User Access: ${error}`
      })
    )
}

const CheckSuperAdmin = (data, callback) => {
  // const hashing = md5('SUPERUSER' + SALT + 'WBAgriSystemV2' + SALT)
  const SALT = 'WIDEAGRI@20220101'
  const hashing = md5('SUPERUSER' + SALT + data.password + SALT)

  const checkPassword = `SELECT * FROM super_user WHERE password = '${hashing}'`
  pool
    .query(checkPassword)
    .then((res) => {
      if (res.rowCount > 0)
        callback({
          ...success200
        })
      else if (res.rowCount === 0)
        callback({
          ...error403,
          message: 'Password tidak dikenal.'
        })
      else callback({ ...error500 })
    })
    .catch((error) => callback({ ...error500, message: `Error checking: ${error}` }))
}

export { Login, CheckSuperAdmin }
