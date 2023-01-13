import React from 'react'
import moment from 'moment'
import { PrintHeader } from '../../../../assets/style/styled'
import { Col, Grid } from '@mantine/core'

export default function Header({ data }) {
  const { comodity_nm, wb_arrive_dt, first_update } = data

  return (
    <PrintHeader>
      <Grid justify="space-evenly">
        <Col span="content">Tanggal Masuk: {moment(wb_arrive_dt).format('DD/MM/YY HH:mm:ss')}</Col>
        <Col span="content">Tanggal Keluar: {moment(first_update).format('DD/MM/YY HH:mm:ss')}</Col>
        <Col span="content">Komoditi: {comodity_nm}</Col>
      </Grid>
    </PrintHeader>
  )
}
