import React, { useCallback, useEffect } from 'react'
import { Button, Divider, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useState } from 'react'
import { ColGrid, FormBox, FormGroup, ScaleGrid } from '../../../../assets/style/styled'
import { MillYieldsController } from '../../../../services'
import { dateFormat, parseValue } from '../../../../helpers/utility'
import moment from 'moment'
import PropTypes from 'prop-types'
import ScaleDisplay from '../../../scaleDisplay/ScaleDisplay'
import 'dayjs/locale/id'

const CpoPkoKeluar = ({ commodity, submitRef, form, dropdownData }) => {
  const { customer, vendor } = dropdownData
  const [history, setHistory] = useState([])
  const [dropdownHistory, setDropdownHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [vehicleSelected, setVehicleSelected] = useState(null)
  const { getScaleHistory, updateData } = MillYieldsController()

  const getHistory = useCallback(() => {
    const payload = {
      commodity: commodity
    }
    getScaleHistory(payload, setLoading, (res) => {
      const temp = []
      res?.forEach((data) => temp.push({ value: data.cd, label: data.pcc_vehicle_cd }))
      setDropdownHistory(temp)
      setHistory(res)
    })
  }, [getScaleHistory, commodity])

  useEffect(() => {
    let mounted = true
    if (mounted) getHistory()

    return () => (mounted = false)
  }, [getHistory])

  const historyChangeHandler = (e) => {
    const selected = history.find((item) => item.cd === e)
    const customerNm = customer.find((item) => item.value === selected.pcc_customer_cd)?.label
    form.setFieldValue('customer_nm', customerNm)
    const newObj = {}
    Object.keys(selected).map((item) => {
      return (newObj[item] = selected[item] || '')
    })
    parseValue(newObj, form)
    setVehicleSelected(e)
  }

  const submitHandler = (values) => {
    if (form.validate().hasErrors) return
    const payload = {
      ...values,
      comodity_nm: commodity,
      customer_nm: values.customer_nm,
      do_date: values.do_date === null ? null : dateFormat(values.do_date, 'Y-MM-DD'),
      first_update: form.values.first_update || moment().format('Y-MM-DD HH:mm:ss'),
      mt_comodity_cd: commodity,
      spb_date: values.spb_date === null ? null : dateFormat(values.spb_date, 'Y-MM-DD')
    }

    updateData(payload, setLoading, () => {
      form.reset()
      getHistory()
      setVehicleSelected(null)
    })
  }

  return (
    <FormBox onSubmit={form.onSubmit(submitHandler)}>
      <ScaleGrid gutter={'md'} justify="space-between" align="start">
        <ColGrid span={12}>
          <ScaleGrid>
            <ColGrid span={2}>
              <TextInput
                disabled={loading}
                label="Kontrak"
                placeholder="Kontrak"
                {...form.getInputProps('contract')}
              />
            </ColGrid>
            <ColGrid span={5}>
              <FormGroup>
                <TextInput
                  disabled={loading}
                  label="Nomor DO"
                  placeholder="Nomor DO"
                  {...form.getInputProps('do_number')}
                />
                <DatePicker
                  disabled={loading}
                  label="Tanggal DO"
                  placeholder="Tanggal DO"
                  locale="id"
                  icon={<i className="ri-calendar-event-line" />}
                  {...form.getInputProps('do_date')}
                />
              </FormGroup>
            </ColGrid>
            <ColGrid span={5}>
              <FormGroup>
                <TextInput
                  disabled={loading}
                  label="Nomor SPB"
                  placeholder="Nomor SPB"
                  {...form.getInputProps('spb_number')}
                />
                <DatePicker
                  disabled={loading}
                  label="Tanggal SPB"
                  placeholder="Tanggal SPB"
                  locale="id"
                  icon={<i className="ri-calendar-event-line" />}
                  {...form.getInputProps('spb_date')}
                />
              </FormGroup>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
        <ColGrid span={6}>
          <ScaleGrid>
            <Divider label="Data NFC" />
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    value={vehicleSelected}
                    disabled={loading}
                    label="No. Kendaraan"
                    placeholder="No. Kendaraan"
                    searchable
                    data={dropdownHistory}
                    size="sm"
                    nothingFound="Tidak ada data."
                    onChange={historyChangeHandler}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    disabled
                    withAsterisk
                    label="Customer"
                    placeholder="Customer"
                    searchable
                    data={customer}
                    size="sm"
                    nothingFound="Tidak ada data."
                    {...form.getInputProps('pcc_customer_cd')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    withAsterisk
                    disabled
                    label="Supplier"
                    placeholder="Supplier"
                    {...form.getInputProps('supplier')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <TextInput
                    withAsterisk
                    disabled
                    label="Supir"
                    placeholder="Supir"
                    {...form.getInputProps('driver_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Pemuat"
                    placeholder="Pemuat"
                    {...form.getInputProps('loader_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    disabled
                    withAsterisk
                    label="Ekspedisi"
                    placeholder="Ekspedisi"
                    searchable
                    data={vendor}
                    size="sm"
                    nothingFound="Tidak ada data."
                    {...form.getInputProps('mt_vndr_rent_vhcle_cd')}
                    onChange={(e) => {
                      const selectedVendor = vendor.find((item) => item.value === e)
                      form.setFieldValue('ekspedisi_nm', selectedVendor.label)
                      form.getInputProps('mt_vndr_rent_vhcle_cd').onChange(e)
                    }}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
          </ScaleGrid>
          <ScaleGrid>
            <Divider label="Kualitas" />
            <ColGrid span={12}>
              <ScaleGrid>
                <ColGrid span={4}>
                  <NumberInput
                    disabled={loading}
                    decimalSeparator="."
                    precision={2}
                    min={0}
                    max={100}
                    icon="%"
                    label="FFA"
                    hideControls
                    {...form.getInputProps('ffa')}
                  />
                </ColGrid>
                <ColGrid span={4}>
                  <NumberInput
                    disabled={loading}
                    decimalSeparator="."
                    precision={2}
                    min={0}
                    max={100}
                    icon="%"
                    label="Moist"
                    hideControls
                    {...form.getInputProps('moist')}
                  />
                </ColGrid>
                <ColGrid span={4}>
                  <NumberInput
                    disabled={loading}
                    decimalSeparator="."
                    precision={2}
                    min={0}
                    max={100}
                    icon="%"
                    label="PV"
                    hideControls
                    {...form.getInputProps('pv')}
                  />
                </ColGrid>
                <ColGrid span={4}>
                  <NumberInput
                    disabled={loading}
                    min={0}
                    label="Dirt"
                    hideControls
                    {...form.getInputProps('dirt')}
                  />
                </ColGrid>
                <ColGrid span={4}>
                  <NumberInput
                    disabled={loading}
                    min={0}
                    label="Dobi"
                    hideControls
                    {...form.getInputProps('dobi')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
        <ColGrid span={6} leftdivider="true">
          <ScaleGrid>
            <Divider label="Data Tambahan" />
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled={loading}
                    label="No Seal"
                    placeholder="No Seal"
                    {...form.getInputProps('seal_number')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <NumberInput
                    disabled={loading}
                    min={0}
                    label="Berat SPB"
                    hideControls
                    rightSection="Kg"
                    {...form.getInputProps('spb_weight')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <Textarea
                    disabled={loading}
                    minRows={3}
                    label="Catatan"
                    {...form.getInputProps('remark1')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
          </ScaleGrid>
          <ScaleGrid>
            <Divider label="Data Timbangan" />
            <ScaleDisplay type="scale-out-cpo" form={form} />
          </ScaleGrid>
        </ColGrid>
        <Button ref={submitRef} type="submit" sx={{ display: 'none' }} />
      </ScaleGrid>
    </FormBox>
  )
}

CpoPkoKeluar.propTypes = {
  commodity: PropTypes.string,
  dropdownData: PropTypes.object,
  form: PropTypes.object,
  submitRef: PropTypes.any
}

export default CpoPkoKeluar
