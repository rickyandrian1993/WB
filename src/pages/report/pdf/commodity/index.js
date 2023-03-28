import { Button, Select, Space, Table } from '@mantine/core'
import moment from 'moment'
import React from 'react'
import toPdf from '../toPdf'
import PropTypes from 'prop-types'
import { getStore, numberFormat, sumData } from '../../../../helpers/utility'
import { ContentHeader, ContentPdf, ReportSectionContent } from '../../ReportStyles'
import { CustomerController, SupplierController } from '../../../../services'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'

export default function Commodity({ data, payloads: { payload, setPayload } }) {
  const { supplier } = SupplierController()
  const { customer } = CustomerController('select')
  const { mill } = getStore('mill')

  return (
    <ReportSectionContent>
      <ScaleGrid align="center" style={{ padding: '16px 0px' }}>
        <ColGrid span={2}>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            required
            withAsterisk
            label="Supplier"
            placeholder="Supplier"
            searchable
            data={supplier}
            value={payload.supplier}
            size="sm"
            nothingFound="Tidak ada data."
            onChange={(supplier) => {
              setPayload({ ...payload, supplier })
            }}
          />
        </ColGrid>
        <ColGrid span={2}>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            required
            withAsterisk
            label="Customer"
            placeholder="Customer"
            searchable
            data={customer}
            value={payload.customer}
            size="sm"
            nothingFound="Tidak ada data."
            onChange={(customer) => setPayload({ ...payload, customer })}
          />
        </ColGrid>
      </ScaleGrid>

      {data.length < 1 && (
        <ReportSectionContent
          style={{ display: 'grid', placeItems: 'center', border: '2px solid 628b48' }}
        >
          No Data Available.
        </ReportSectionContent>
      )}
      {data.length > 0 && (
        <ReportSectionContent>
          <Button
            className="print-pdf"
            onClick={() =>
              toPdf(
                `Laporan ${payload.commodity} - ${moment().format('DD-MM-YYYY')}`,
                '#generate-pdf'
              )
            }
            leftIcon={<i className="ri-download-2-line"></i>}
          >
            Download Pdf
          </Button>
          <div id="generate-pdf">
            <ContentPdf>
              <ContentHeader>
                <h4>LAPORAN PENIMBANGAN {payload.commodity.toUpperCase()}</h4>
                <div>
                  <p>
                    Periode : {moment(payload.startDate).format('DD MMMM Y')} -{' '}
                    {moment(payload.endDate).format('DD MMMM Y')}
                  </p>
                  <p>
                    Dari - Ke : {payload.supplier || '-'} - {data[0].customer || '-'}
                  </p>
                  <p>Mill : {mill?.nm || '-'}</p>
                  <p>Total Trip : {data.length}</p>
                  <p>Total Netto : {numberFormat(sumData(data, 'total_netto'))}</p>
                </div>
              </ContentHeader>
              <Space h="lg" />
              <Table withBorder withColumnBorders>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Tanggal</th>
                    <th>No. Kendaraan</th>
                    <th>Ekspedisi</th>
                    <th>No. SPB</th>
                    <th>No. DO</th>
                    <th>Tgl. DO</th>
                    <th>Timbang Masuk</th>
                    <th>Timbang Keluar</th>
                    <th>Berat</th>
                    <th>Potongan</th>
                    <th>Netto</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length < 1 && (
                    <tr>
                      <td colSpan={12} align="center">
                        No Data Available.
                      </td>
                    </tr>
                  )}
                  {data?.map((item, i) => {
                    return (
                      <tr key={`all-${i}`}>
                        <td align="center">{i + 1}</td>
                        <td align="center">{moment(item.mill_arrive_dt).format('DD/MM/YYYY')}</td>
                        <td align="center">{item.pcc_vehicle_cd || '-'}</td>
                        <td align="center">{item.ekspedisi_nm || '-'}</td>
                        <td align="center">{item.spb_number || '-'}</td>
                        <td align="center">{item.do_number || '-'}</td>
                        <td align="center">{moment(item.do_date).format('DD/MM/YYYY')}</td>
                        <td align="center">{numberFormat(item.first_w) || '-'}</td>
                        <td align="center">{numberFormat(item.second_w) || '-'}</td>
                        <td align="center">{numberFormat(item.netto_w) || '-'}</td>
                        <td align="center">{numberFormat(item.cut) || '-'}</td>
                        <td align="center">{numberFormat(item.total_netto) || '-'}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </ContentPdf>
          </div>
        </ReportSectionContent>
      )}
    </ReportSectionContent>
  )
}

Commodity.propTypes = {
  data: PropTypes.array,
  payloads: PropTypes.object
}
