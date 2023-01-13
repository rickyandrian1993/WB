import { Col, Grid } from '@mantine/core'
import React from 'react'
import { PrintFooter } from '../../../../assets/style/styled'
import { getStore } from '../../../../helpers/utility'
import PropTypes from 'prop-types'

export default function Footer({ data }) {
  const { mill } = getStore('mill')
  const { driver_nm, wb_created_by } = data

  return (
    <PrintFooter>
      <Grid>
        <Col span={3}>Diketahui Oleh</Col>
        <Col span={3}>Penimbang</Col>
        <Col span={3}>Supir</Col>
        <Col span={3}>Diterima Oleh</Col>
      </Grid>
      <Grid>
        <Col span={3}>{mill?.mill_manager || '-'}</Col>
        <Col span={3}>{wb_created_by}</Col>
        <Col span={3}>{driver_nm}</Col>
        <Col span={3}>(________________)</Col>
      </Grid>
      <Grid>
        <Col span={3}>Mill Manager</Col>
        <Col span={3}>Penimbang</Col>
        <Col span={3}>Supir</Col>
        <Col span={3}></Col>
      </Grid>
    </PrintFooter>
  )
}

Footer.propTypes = {
  data: PropTypes.object
}
