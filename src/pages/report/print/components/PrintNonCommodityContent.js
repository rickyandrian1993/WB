import { Col, Grid } from '@mantine/core'
import React from 'react'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'

export default function PrintNonCommodityContent({ data }) {
  const {
    customer_nm,
    do_date,
    do_number,
    driver_nm,
    ekspedisi_nm,
    first_w,
    loader_nm,
    mill_nm,
    netto_w,
    pcc_vehicle_cd,
    remark1,
    seal_number,
    second_w,
    spb_date,
    spb_number
  } = data

  return (
    <PrintContent>
      <Grid>
        <Col span={3}>
          <Grid>
            <Col>No. Tgl DD</Col>
          </Grid>
          <Grid>
            <Col>Mill/Pabrik</Col>
          </Grid>
          <Grid>
            <Col>Supir</Col>
          </Grid>
          <Grid>
            <Col>Ekspedisi</Col>
          </Grid>
          <Grid>
            <Col>Pelanggan</Col>
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
            <Col>{driver_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{ekspedisi_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{customer_nm || '-'}</Col>
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
            <Col>Nomor Kendaraan</Col>
          </Grid>
          <Grid>
            <Col>Pemuat</Col>
          </Grid>
          <Grid>
            <Col>Timbangan Pertama</Col>
          </Grid>
          <Grid>
            <Col>Timbangan Kedua</Col>
          </Grid>
          <Grid>
            <Col>Netto</Col>
          </Grid>
        </Col>
        <Col span={3}>
          <Grid>
            <Col>
              {spb_number} - {spb_date && moment(spb_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col>{pcc_vehicle_cd || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{loader_nm || '-'}</Col>
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
        </Col>
      </Grid>
      <Grid>
        <Col>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

PrintNonCommodityContent.propTypes = {
  data: PropTypes.object
}
