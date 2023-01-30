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
    spb_number,
    supplier,
    spb_weight
  } = data

  return (
    <PrintContent>
      <Grid className='info'>
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
            <Col span={6}>Supplier</Col>
            <Col span={6}>{supplier || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Supir</Col>
            <Col span={6}>{driver_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Ekspedisi</Col>
            <Col span={6}>{ekspedisi_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Pelanggan</Col>
            <Col span={6}>{customer_nm || '-'}</Col>
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
            <Col span={6}>No. Kendaraan</Col>
            <Col span={6}>{pcc_vehicle_cd || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Pemuat</Col>
            <Col span={6}>{loader_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Berat SPB</Col>
            <Col span={6}>{numberFormat(spb_weight) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Timbangan Ke-1</Col>
            <Col span={6}>{numberFormat(first_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Timbangan Ke-2</Col>
            <Col span={6}>{numberFormat(second_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Netto</Col>
            <Col span={6}>{numberFormat(netto_w) || '-'} Kg</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid>
        <Col style={{borderTop: "2px double #628b48"}}>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

PrintNonCommodityContent.propTypes = {
  data: PropTypes.object
}
