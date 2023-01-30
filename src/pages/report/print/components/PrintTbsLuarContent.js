import { Col, Grid } from '@mantine/core'
import React from 'react'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'

export default function PrintTbsLuarContent({ data }) {
  const {
    after_cut,
    bjr,
    customer_nm,
    cut,
    do_date,
    do_number,
    driver_nm,
    ekspedisi_nm,
    fresh_fruit,
    fresh_fruit_kg,
    garbage,
    garbage_kg,
    grading_brondolan,
    grading_brondolan_kg,
    first_w,
    janjang_kosong,
    janjang_kosong_kg,
    loader_nm,
    long_stalk,
    long_stalk_kg,
    mill_nm,
    netto_w,
    overripe_brondolan,
    overripe_brondolan_kg,
    overripe_fruit,
    overripe_fruit_kg,
    pcc_vehicle_cd,
    remark1,
    restan_overnight,
    restan_overnight_kg,
    sand_fruit,
    sand_fruit_kg,
    seal_number,
    second_w,
    spb_date,
    spb_number,
    total_brondolan,
    total_bunch,
    water,
    water_kg,
    young_fruit,
    young_fruit_kg,
    grade_class,
    supplier,
    spb_weight,
    farmer
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
            <Col span={6}>Customer</Col>
            <Col span={6}>{customer_nm || '-'}</Col>
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
            <Col span={6}>Petani</Col>
            <Col span={6}>{farmer || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Pemuat</Col>
            <Col span={6}>{loader_nm || '-'}</Col>
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
            <Col span={6}>Kelas</Col>
            <Col span={6}>{grade_class || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Berat SPB</Col>
            <Col span={6}>{numberFormat(spb_weight) || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Jumlah Tandan</Col>
            <Col span={6}>{numberFormat(total_bunch) || '-'}</Col>
          </Grid>
          <Grid>
            <Col span={6}>Brondolan</Col>
            <Col span={6}>{numberFormat(total_brondolan) || '-'}</Col>
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
            <Col span={6}>Buah Mentah/HB</Col>
            <Col span={3}>{numberFormat(fresh_fruit)} Tdn</Col>
            <Col span={3}>{numberFormat(fresh_fruit_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Buah Busuk</Col>
            <Col span={3}>{numberFormat(overripe_fruit)} Tdn</Col>
            <Col span={3}>{numberFormat(overripe_fruit_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Buah Muda</Col>
            <Col span={3}>{numberFormat(young_fruit)} Tdn</Col>
            <Col span={3}>{numberFormat(young_fruit_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Buah Pasir</Col>
            <Col span={3}>{numberFormat(sand_fruit)} Tdn</Col>
            <Col span={3}>{numberFormat(sand_fruit_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Tangkai Panjang</Col>
            <Col span={3}>{numberFormat(long_stalk)} Tdn</Col>
            <Col span={3}>{numberFormat(long_stalk_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Janjang Kosong</Col>
            <Col span={3}>{numberFormat(janjang_kosong)} Tdn</Col>
            <Col span={3}>{numberFormat(janjang_kosong_kg)} Kg</Col>
          </Grid>
        </Col>
        <Col span={6}>
          <Grid>
            <Col span={6}>TBS Berair</Col>
            <Col span={3}>{water} %</Col>
            <Col span={3}>{numberFormat(water_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Brondolan</Col>
            <Col span={3}>{grading_brondolan} %</Col>
            <Col span={3}>{numberFormat(grading_brondolan_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Brondolan Busuk</Col>
            <Col span={3}>{overripe_brondolan} %</Col>
            <Col span={3}>{numberFormat(overripe_brondolan_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Overnight/Restan</Col>
            <Col span={3}>{restan_overnight} %</Col>
            <Col span={3}>{numberFormat(restan_overnight_kg)} Kg</Col>
          </Grid>
          <Grid>
            <Col span={6}>Sampah</Col>
            <Col span={3}>{garbage} %</Col>
            <Col span={3}>{numberFormat(garbage_kg)} Kg</Col>
          </Grid>
        </Col>
      </Grid>
      <Grid>
        <Col>Catatan: {remark1}</Col>
      </Grid>
    </PrintContent>
  )
}

PrintTbsLuarContent.propTypes = {
  data: PropTypes.object
}
