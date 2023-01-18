import { Button, Loader, Select } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import moment from 'moment'
import React, { useCallback, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import DataTable from 'react-data-table-component'
import {
  ColGrid,
  FormGroup,
  ReportHeader,
  ReportTableBox,
  ScaleGrid
} from '../../assets/style/styled'
import { ToastNotification } from '../../components'
import { label } from '../../constants'
import { labelNonDetail } from '../../constants/databaseLabelKeys'
import { columns } from '../../constants/headerTable'
import { generateHeader, getLastMonthDate, parseCSVData } from '../../helpers/utility'
import { CommodityController, ReportController } from '../../services'

const Expand = ({ data }) => {
  const {
    wb_arrive_dt,
    estate_nm,
    total_bunch,
    ekspedisi_nm,
    customer_nm,
    seal_number,
    cut,
    after_cut,
    bjr
  } = data
  const extra = {
    estate_nm,
    total_bunch,
    ekspedisi_nm,
    customer_nm,
    seal_number,
    cut,
    after_cut,
    bjr
  }

  return (
    <ScaleGrid justify="space-between" px={12}>
      {Object.keys(extra).map((items, i) => (
        <ColGrid span="content" key={`${wb_arrive_dt}-${items}-${i}`}>
          <p>{label[items]}</p>
          <p>{extra[items] ?? '-'}</p>
        </ColGrid>
      ))}
    </ScaleGrid>
  )
}

export default function Report() {
  const { getReport } = ReportController()
  const { commodity } = CommodityController()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [payload, setPayload] = useState({
    commodity: 'all',
    startDate: getLastMonthDate(),
    endDate: new Date(),
    page: 1,
    perPage: 10,
    total: 0
  })

  const handleChangeData = useCallback(
    ({ results, currentPage, total }) => {
      setData(results)
      setPayload({ ...payload, page: currentPage, total })
    },
    [payload]
  )

  const validateDateFilter = (start, end) => {
    if (start === null || end === null) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Salah satu tanggal tidak boleh kosong',
        isError: true
      })
      setData([])
    } else if (start > end) {
      ToastNotification({
        title: 'Kesalahan',
        message: 'Tanggal mulai harus lebih kecil dari tanggal akhir',
        isError: true
      })
    } else setLoading(true)
  }

  useEffect(() => {
    if (loading) {
      getReport(payload, setLoading, handleChangeData)
    }
  }, [data, getReport, handleChangeData, loading, payload])

  return (
    <ScaleGrid align="center">
      <ColGrid>
        <ReportHeader>
          <ScaleGrid align="center" justify={'space-between'}>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={4}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    required
                    withAsterisk
                    label="Komoditi"
                    placeholder="Komoditi"
                    searchable
                    data={[{ label: 'Semua', value: 'all' }, ...commodity]}
                    size="sm"
                    nothingFound="Tidak ada data."
                    onChange={(commodity) => {
                      setPayload({ ...payload, commodity })
                      setLoading(true)
                    }}
                  />
                </ColGrid>
                <ColGrid span={8}>
                  <FormGroup>
                    <DatePicker
                      label="Filter Date"
                      placeholder="Tanggal Mulai"
                      locale="id"
                      value={payload.startDate}
                      icon={<i className="ri-calendar-event-line" />}
                      onChange={(e) => {
                        validateDateFilter(e, payload.endDate)
                        setPayload({ ...payload, startDate: e })
                      }}
                    />
                    <DatePicker
                      placeholder="Tanggal Akhir"
                      locale="id"
                      value={payload.endDate}
                      icon={<i className="ri-calendar-event-line" />}
                      onChange={(e) => {
                        validateDateFilter(payload.startDate, e)
                        setPayload({ ...payload, endDate: e })
                      }}
                    />
                  </FormGroup>
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <ColGrid span={'content'}>
              <ScaleGrid>
                <ColGrid span={'content'}>
                  <CSVLink
                    data={parseCSVData(data)}
                    headers={generateHeader(labelNonDetail)}
                    separator=";"
                    filename={`Laporan Timbangan ${moment(new Date()).format(
                      'DD-MM-YY HHmmss'
                    )}.csv`}
                  >
                    <Button leftIcon={<i className="ri-download-2-line"></i>}>Unduh CSV</Button>
                  </CSVLink>
                </ColGrid>
                <ColGrid span={'content'}>
                  <CSVLink
                    data={parseCSVData(data)}
                    headers={generateHeader(label)}
                    separator=";"
                    filename={`Laporan Timbangan Detail ${moment(new Date()).format(
                      'DD-MM-YY HHmmss'
                    )}.csv`}
                  >
                    <Button leftIcon={<i className="ri-download-2-line"></i>}>
                      Unduh CSV Detail
                    </Button>
                  </CSVLink>
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
          </ScaleGrid>
        </ReportHeader>
      </ColGrid>
      <ColGrid>
        <ReportTableBox>
          <DataTable
            paginationTotalRows={payload.total}
            columns={columns}
            data={data}
            expandableRowsComponent={Expand}
            direction="auto"
            expandOnRowClicked
            expandableRows
            expandableRowsHideExpander
            fixedHeaderScrollHeight="300px"
            highlightOnHover
            persistTableHead
            pagination
            paginationServer
            progressPending={loading}
            progressComponent={<Loader color="#628B48" variant="bars" size="xl" mt={34} />}
            onChangeRowsPerPage={(perPage, page) => {
              setPayload({ ...payload, page, perPage })
              setLoading(true)
            }}
            onChangePage={(page) => {
              setPayload({ ...payload, page })
              setLoading(true)
            }}
            defaultSortFieldId
            pointerOnHover
            responsive
            subHeaderAlign="left"
            subHeaderWrap
          />
        </ReportTableBox>
      </ColGrid>
    </ScaleGrid>
  )
}
