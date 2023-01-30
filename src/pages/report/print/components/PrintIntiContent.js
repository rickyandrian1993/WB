import { Col, Grid } from '@mantine/core'
import React from 'react'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'

export default function PrintTbsIntiContent({ data }) {
  const {
    afdeling_nm,
    after_cut,
    bjr,
    block_nm,
    customer_nm,
    cut,
    do_date,
    do_number,
    driver_nm,
    ekspedisi_nm,
    estate_nm,
    fresh_fruit,
    garbage,
    grade_class,
    grading_brondolan,
    first_w,
    janjang_kosong,
    loader_nm,
    loader_nm_2,
    loader_nm_3,
    long_stalk,
    mill_nm,
    netto_w,
    overripe_brondolan,
    overripe_fruit,
    pcc_vehicle_cd,
    remark1,
    restan_overnight,
    seal_number,
    second_w,
    supplier,
    spb_date,
    spb_number,
    spb_weight,
    total_brondolan,
    total_bunch,
    young_fruit
  } = data

  return (
    <PrintContent>
      <Grid className="info">
        <Col span={4}>
          <Grid>
            <Col span={6}>No/Tgl DO</Col>
            <Col span={6}>
              {do_number} - {do_date && moment(do_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col span={6}>No/Tgl SPB</Col>
            <Col span={6}>
              {spb_number} - {spb_date && moment(spb_date).format('DD/MM/YY')}
            </Col>
          </Grid>
          <Grid>
            <Col span={6}>Mill/Pabrik</Col>
            <Col span={6}>{mill_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Estate</Col>
            <Col span={6}>{estate_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Subblock</Col>
            <Col span={6}>{block_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Afdeling</Col>
            <Col span={6}>{afdeling_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Supplier</Col>
            <Col span={6}>{supplier || '-'}</Col>
          </Grid>
        </Col>
        <Col span={4}>
          <Grid>
            <Col span={6}>Customer</Col>
            <Col span={6}>{customer_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Kelas</Col>
            <Col span={6}>{grade_class || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>No. Kendaraan</Col>
            <Col span={6}>{pcc_vehicle_cd || '-'}</Col>
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
          <Grid align="center">
            <Col span={6}>Pemuat 1</Col>
            <Col span={6}>{loader_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Pemuat 2</Col>
            <Col span={6}>{loader_nm_2 || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Pemuat 3</Col>
            <Col span={6}>{loader_nm_3 || '-'}</Col>
          </Grid>
        </Col>
        <Col span={4}>
          <Grid>
            <Col span={6}>Jumlah Tandan</Col>
            <Col span={6}>{numberFormat(total_bunch) || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Brondolan</Col>
            <Col span={6}>{numberFormat(total_brondolan) || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Berat SPB</Col>
            <Col span={6}>{numberFormat(spb_weight) || '-'}</Col>
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
          <Grid>
            <Col span={6}>Potongan</Col>
            <Col span={6}>{numberFormat(cut) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Setelah Potongan</Col>
            <Col span={6}>{numberFormat(after_cut) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>BJR</Col>
            <Col span={6}>{bjr || '-'}</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid className="grading-info">
        <Col span={6}>
          <Grid>
            <Col span={8}>Buah Mentah/HB</Col>
            <Col span={4}>{numberFormat(fresh_fruit)} Tdn</Col>
          </Grid>
          <Grid>
            <Col span={8}>Buah Busuk</Col>
            <Col span={4}>{numberFormat(overripe_fruit)} Tdn</Col>
          </Grid>
          <Grid>
            <Col span={8}>Buah Muda</Col>
            <Col span={4}>{numberFormat(young_fruit)} Tdn</Col>
          </Grid>
          <Grid>
            <Col span={8}>Tangkai Panjang</Col>
            <Col span={4}>{numberFormat(long_stalk)} Tdn</Col>
          </Grid>
          <Grid>
            <Col span={8}>Janjang Kosong</Col>
            <Col span={4}>{numberFormat(janjang_kosong)} Tdn</Col>
          </Grid>
        </Col>
        <Col span={6}>
          <Grid>
            <Col span={8}>Brondolan</Col>
            <Col span={3}>{grading_brondolan} %</Col>
          </Grid>
          <Grid>
            <Col span={8}>Brondolan Busuk</Col>
            <Col span={3}>{overripe_brondolan} %</Col>
          </Grid>
          <Grid>
            <Col span={8}>Overnight/Restan</Col>
            <Col span={3}>{restan_overnight} %</Col>
          </Grid>
          <Grid>
            <Col span={8}>Sampah</Col>
            <Col span={3}>{garbage} %</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid>
        <Col>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

PrintTbsIntiContent.propTypes = {
  data: PropTypes.object
}
