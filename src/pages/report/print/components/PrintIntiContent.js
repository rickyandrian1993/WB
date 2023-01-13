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
    spb_date,
    spb_number,
    total_brondolan,
    total_bunch,
    young_fruit
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
            <Col>Estate</Col>
          </Grid>
          <Grid>
            <Col>Afdeling</Col>
          </Grid>
          <Grid>
            <Col>Subblock</Col>
          </Grid>
          <Grid>
            <Col>Supir</Col>
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
            <Col>{estate_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{afdeling_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{block_nm || '-'}</Col>
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
            <Col>Jumlah Tandan</Col>
          </Grid>
          <Grid>
            <Col>Brondolan</Col>
          </Grid>
          <Grid>
            <Col>Pemuat 1</Col>
          </Grid>
          <Grid>
            <Col>Pemuat 2</Col>
          </Grid>
          <Grid>
            <Col>Pemuat 3</Col>
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
            <Col>{numberFormat(total_bunch) || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{numberFormat(total_brondolan) || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{loader_nm || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{loader_nm_2 || '-'}</Col>
          </Grid>
          <Grid>
            <Col>{loader_nm_3 || '-'}</Col>
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
