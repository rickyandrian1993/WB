import pool from '../dbconfig.js'
import { error500, success200 } from '../constants/responseCallback.js'

const getSupplier = (req, res) => {
  const getListQuery = `SELECT cd, name FROM supplier ORDER BY name ASC`
  pool
    .query(getListQuery)
    .then((result) => res.json({ ...success200, data: result.rows }))
    .catch((err) => res.status(500).json({ ...error500, data: `Error get list: ${err}` }))
}

const addSupplier = (req, res) => {
  const { name, created_by } = req.body
  const insertQuery = `INSERT INTO supplier (cd, name, created_by) VALUES ('${name}', '${name}', '${created_by}')`
  pool
    .query(insertQuery)
    .then((_) => res.json({ ...success200 }))
    .catch((err) => res.status(500).json({ ...error500, data: `Error insert supplier: ${err}` }))
}

const deleteSupplier = (req, res) => {}

export { getSupplier, addSupplier, deleteSupplier }
