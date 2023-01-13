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
      <Grid>
        <Col span={3}>
          <Grid>
            <Col>No. Tgl DO</Col>
          </Grid>
          <Grid>
            <Col>Mill/Pabrik</Col>
          </Grid>
          <Grid>
            <Col>Ekspedisi</Col>
          </Grid>
          <Grid>
            <Col>Pelanggan</Col>
          </Grid>
          <Grid>
            <Col>Bruto</Col>
          </Grid>
          <Grid>
            <Col>Tarra</Col>
          </Grid>
          <Grid>
            <Col>Netto</Col>
          </Grid>
          <Grid>
            <Col>Nomor Seal</Col>
          </Grid>
        </Col>
        <Col span={3}>
          <Grid>
            <Col>
              {do_number} - {do_date && moment(do_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col>{mill_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{ekspedisi_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{customer_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(first_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(second_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(netto_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col>{seal_number || '-'}</Col>
          </Grid>
        </Col>
        <Col span={3}>
          <Grid>
            <Col>No. Tgl SPB</Col>
          </Grid>
          <Grid>
            <Col>Komoditi</Col>
          </Grid>
          <Grid>
            <Col>Nomor Kendaraan</Col>
          </Grid>
          <Grid>
            <Col></Col>
          </Grid>
          <Grid>
            <Col>FFA %</Col>
          </Grid>
          <Grid>
            <Col>Moist %</Col>
          </Grid>
          <Grid>
            <Col>PV %</Col>
          </Grid>
          <Grid>
            <Col>Dirt</Col>
          </Grid>
          <Grid>
            <Col>Dobi</Col>
          </Grid>
        </Col>
        <Col span={3}>
          <Grid>
            <Col>
              {spb_number} - {spb_date && moment(spb_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col>{comodity_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{pcc_vehicle_cd || '-'}</Col>
          </Grid>
          <Grid>
            <Col></Col>
          </Grid>
          <Grid>
            <Col>{ffa || '-'} %</Col>
          </Grid>
          <Grid>
            <Col>{moist || '-'} %</Col>
          </Grid>
          <Grid>
            <Col>{pv || '-'} %</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(dirt) || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(dobi) || '-'}</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid>
        <Col>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

SPBContent.propTypes = {
  data: PropTypes.object
}
