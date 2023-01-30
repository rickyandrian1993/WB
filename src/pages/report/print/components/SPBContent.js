import React from 'react'
import { Col, Grid, Title } from '@mantine/core'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'

export default function SPBContent({ data }) {
  const {
    comodity_nm,
    customer_nm,
    dirt,
    do_date,
    do_number,
    dobi,
    ekspedisi_nm,
    ffa,
    first_w,
    mill_nm,
    moist,
    netto_w,
    pcc_vehicle_cd,
    pv,
    remark1,
    seal_number,
    second_w,
    spb_date,
    spb_number
  } = data

  return (
    <PrintContent>
      <Title id="print-title" order={1} align="center">
        Surat Penerimaan Barang
      </Title>
      <Grid className="info">
        <Col span={6}>
          <Grid>
            <Col span={6}>No/Tgl DO</Col>
            <Col span={6}>
              {do_number} - {do_date && moment(do_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col span={6}>Mill/Pabrik</Col>
            <Col span={6}>{mill_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Ekspedisi</Col>
            <Col span={6}>{ekspedisi_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Customer</Col>
            <Col span={6}>{customer_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Bruto</Col>
            <Col span={6}>{numberFormat(first_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Tarra</Col>
            <Col span={6}>{numberFormat(second_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Netto</Col>
            <Col span={6}>{numberFormat(netto_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>No. Seal</Col>
            <Col span={6}>{seal_number || '-'}</Col>
          </Grid>
        </Col>
        <Col span={6}>
          <Grid>
            <Col span={6}>No/Tgl SPB</Col>
            <Col span={6}>
              {spb_number} - {spb_date && moment(spb_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col span={6}>Komoditi</Col>
            <Col span={6}>{comodity_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>No. Kendaraan</Col>
            <Col span={6}>{pcc_vehicle_cd || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}></Col>
            <Col span={6}></Col>
          </Grid>
          <Grid>
            <Col span={6}>FFA %</Col>
            <Col span={6}>{ffa || '-'} %</Col>
          </Grid>
          <Grid>
            <Col span={6}>Moist %</Col>
            <Col span={6}>{moist || '-'} %</Col>
          </Grid>
          <Grid>
            <Col span={6}>PV %</Col>
            <Col span={6}>{pv || '-'} %</Col>
          </Grid>
          <Grid>
            <Col span={6}>Dirt</Col>
            <Col span={6}>{numberFormat(dirt) || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Dobi</Col>
            <Col span={6}>{numberFormat(dobi) || '-'}</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid>
        <Col style={{ borderTop: '2px double #628b48' }}>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

SPBContent.propTypes = {
  data: PropTypes.object
}
