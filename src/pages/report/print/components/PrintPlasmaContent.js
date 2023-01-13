import { Col, Grid } from '@mantine/core'
import React from 'react'
import { PrintContent } from '../../../../assets/style/styled'
import PropTypes from 'prop-types'
import moment from 'moment'
import { numberFormat } from '../../../../helpers/utility'

export default function PrintTbsPlasmaContent({ data }) {
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
    young_fruit_kg
  } = data
  return (
    <PrintContent>
      <Grid>
        <Col span={3}>
          <Grid>
            <Col>No. Tgl DO</Col>
          </Grid>
          <Grid>
            <Col>Mill/Pabrik</Col>
          </Grid>
          <Grid>
            <Col>Jumlah Tandan</Col>
          </Grid>
          <Grid>
            <Col>Pemuat</Col>
          </Grid>
          <Grid>
            <Col>Ekspedisi</Col>
          </Grid>
          <Grid>
            <Col>Customer</Col>
          </Grid>
          <Grid>
            <Col>Nomor Seal</Col>
          </Grid>
          <Grid>
            <Col>Timbangan Pertama</Col>
          </Grid>
          <Grid>
            <Col>Timbangan Kedua</Col>
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
            <Col>{numberFormat(total_bunch) || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{loader_nm || '-'}</Col>
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
          <Grid>
            <Col>{numberFormat(first_w) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(second_w) || '-'} Kg</Col>
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
            <Col>Brondolan</Col>
          </Grid>
          <Grid>
            <Col>Supir</Col>
          </Grid>
          <Grid>
            <Col>Potongan</Col>
          </Grid>
          <Grid>
            <Col>Setelah Potongan</Col>
          </Grid>
          <Grid>
            <Col>BJR</Col>
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
            <Col>{numberFormat(total_brondolan) || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{driver_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(cut) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(after_cut) || '-'} Kg</Col>
          </Grid>
          <Grid>
            <Col>{bjr || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(netto_w) || '-'} Kg</Col>
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
            <Col span={3}></Col>
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

PrintTbsPlasmaContent.propTypes = {
  data: PropTypes.object
}
