import React, { useState } from 'react'
import { Button, LoadingOverlay, Select, Space } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { ColGrid, FormGroup, ReportHeader, ScaleGrid } from '../../assets/style/styled'
import { ToastNotification } from '../../components'
import { ReportController } from '../../services'
import TBSIntiReport from './pdf/tbsInti'
import NonCommodity from './pdf/nonCommodity'
import { commodityList } from '../../constants/commodityList'
import Commodity from './pdf/commodity'
import AllReportData from './pdf/allReport'
import TbsLuarPlasmaUSBReport from './pdf/tbsLuarPlasmaUSB'

export default function Report() {
  const { getReportData } = ReportController()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [payload, setPayload] = useState({
    commodity: '',
    estate: '',
    supplier: '',
    customer: '',
    startDate: new Date(),
    endDate: new Date()
  })

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
    }
  }

  const globalSearchHandler = () => {
    setLoading(true)
    getReportData(payload, (res) => {
      setData(res)
      setLoading(false)
    })
  }

  return (
    <>
      <LoadingOverlay visible={loading} overlayBlur={2} />
      <ScaleGrid align="center">
        <ColGrid>
          <ReportHeader>
            <ScaleGrid align="center" justify={'space-between'}>
              <ColGrid span={12}>
                <ScaleGrid>
                  <ColGrid span={2}>
                    <Select
                      rightSection={<i className="ri-arrow-down-s-line"></i>}
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                      required
                      withAsterisk
                      label="Komoditi"
                      placeholder="Komoditi"
                      searchable
                      data={[{ label: 'Semua', value: 'all', group: 'Semua' }, ...commodityList]}
                      size="sm"
                      nothingFound="Tidak ada data."
                      onChange={(commodity) => {
                        setPayload({
                          ...payload,
                          customer: '',
                          estate: '',
                          supplier: '',
                          commodity
                        })
                        setData([])
                      }}
                    />
                  </ColGrid>
                  {payload.commodity === 'all' && (
                    <ColGrid span={2}>
                      <DatePicker
                        label="Tanggal"
                        placeholder="Tanggal"
                        locale="id"
                        value={payload.startDate}
                        icon={<i className="ri-calendar-event-line" />}
                        onChange={(e) => {
                          setPayload({ ...payload, startDate: e })
                        }}
                      />
                    </ColGrid>
                  )}
                  {payload.commodity !== 'all' && (
                    <ColGrid span={4}>
                      <FormGroup>
                        <DatePicker
                          withAsterisk
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
                  )}
                  <ColGrid span={2}>
                    <Button
                      onClick={globalSearchHandler}
                      leftIcon={<i className="ri-file-search-line"></i>}
                    >
                      Cari
                    </Button>
                  </ColGrid>
                </ScaleGrid>
                <Space h="md" />
              </ColGrid>
            </ScaleGrid>
          </ReportHeader>
        </ColGrid>
      </ScaleGrid>
      {!loading && (
        <>
          {payload.commodity === 'all' && <AllReportData data={data} payload={payload} />}
          {['TBS Inti', 'Brondolan'].includes(payload.commodity) && (
            <TBSIntiReport data={data} payloads={{ payload, setPayload }} />
          )}
          {['TBS Luar', 'TBS Plasma', 'USB'].includes(payload.commodity) && (
            <TbsLuarPlasmaUSBReport data={data} payloads={{ payload, setPayload }} />
          )}
          {commodityList
            .filter((item) => item.group === 'Non-Commodity')
            .map((group) => group.value)
            .includes(payload.commodity) && <NonCommodity data={data} payloads={{ payload }} />}
          {commodityList
            .filter((item) => item.group === 'Commodity')
            .map((group) => group.value)
            .includes(payload.commodity) && (
            <Commodity data={data} payloads={{ payload, setPayload }} />
          )}
        </>
      )}
    </>
  )
}
