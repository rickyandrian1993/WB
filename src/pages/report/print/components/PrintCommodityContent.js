import { Col, Grid } from '@mantine/core'
import React from 'react'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'

export default function PrintCommodityContent({ data }) {
  const {
    customer_nm,
    dirt,
    do_date,
    do_number,
    dobi,
    driver_nm,
    ekspedisi_nm,
    ffa,
    first_w,
    loader_nm,
    mill_nm,
    moist,
    netto_w,
    pcc_vehicle_cd,
    pv,
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
            <Col span={6}>Supplier</Col>
            <Col span={6}>{supplier || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Customer</Col>
            <Col span={6}>{customer_nm || '-'}</Col>
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
            <Col span={6}>No. Polisi</Col>
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
      <Grid justify="center" style={{ borderTop: '2px double #628b48' }}>
        <Col span={6}>
          <Grid>
            <Col span={6}>FFA %</Col>
            <Col span={6} style={{textAlign:'right'}}>{ffa || '-'} %</Col>
          </Grid>
          <Grid>
            <Col span={6}>Moist %</Col>
            <Col span={6} style={{textAlign:'right'}}>{moist || '-'} %</Col>
          </Grid>
          <Grid>
            <Col span={6}>PV %</Col>
            <Col span={6} style={{textAlign:'right'}}>{pv || '-'} %</Col>
          </Grid>
        </Col>
        <Col span={6}>
          <Grid>
            <Col span={6}>Dirt</Col>
            <Col span={6} style={{textAlign:'right'}}>{numberFormat(dirt) || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Dobi</Col>
            <Col span={6} style={{textAlign:'right'}}>{numberFormat(dobi) || '-'}</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid style={{ borderTop: '2px double #628b48' }}>
        <Col>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

PrintCommodityContent.propTypes = {
  data: PropTypes.object
}
