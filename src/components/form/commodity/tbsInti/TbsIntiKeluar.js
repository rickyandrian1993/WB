import { Button, Divider, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useState } from 'react'
import { ColGrid, FormBox, FormGroup, ScaleGrid } from '../../../../assets/style/styled'
import { defaultKeyInitialValue } from '../../../../constants/basePayload'
import { dateFormat, parseValue, trimPayload } from '../../../../helpers/utility'
import { MillYieldsController } from '../../../../services'
import ScaleDisplay from '../../../scaleDisplay/ScaleDisplay'

const TbsIntiKeluar = ({ commodity, submitRef, form, dropdownData }) => {
  const { customer, vendor } = dropdownData
  const { getScaleHistory, updateData } = MillYieldsController()

  const [history, setHistory] = useState([])
  const [dropdownHistory, setDropdownHistory] = useState([])
  const [vehicleSelected, setVehicleSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  const getHistory = useCallback(() => {
    const payload = {
      commodity: commodity
    }
    getScaleHistory(payload, setLoading, (res) => {
      const temp = []
      res?.forEach((data) => {
        if (data.pcc_vehicle_cd) temp.push({ value: data.cd, label: data.pcc_vehicle_cd })
      })
      setDropdownHistory(temp)
      setHistory(res)
    })
  }, [commodity, getScaleHistory])

  useEffect(() => {
    let mounted = true
    if (mounted) getHistory()

    return () => (mounted = false)
  }, [getHistory])

  const historyChangeHandler = (e) => {
    const selected = history.find((item) => item.cd === e)
    const newObj = {}
    Object.keys(selected).map((item) => {
      return (newObj[item] = selected[item] || '')
    })
    parseValue(newObj, form)
    setVehicleSelected(e)
  }

  const submitHandler = (values) => {
    const trimmedValue = trimPayload(values, defaultKeyInitialValue)
    if (form.validate().hasErrors) return
    const payload = {
      ...trimmedValue,
      cd: values.cd,
      comodity_nm: commodity,
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
                  locale="id"
                  placeholder="Tanggal SPB"
                  icon={<i className="ri-calendar-event-line" />}
                  {...form.getInputProps('spb_date')}
                />
              </FormGroup>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
        <Divider label="Data NFC" />
        <ColGrid span={6}>
          <ScaleGrid>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
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
                    disabled
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
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
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Jumlah Tandan"
                    placeholder="Jumlah Tandan"
                    {...form.getInputProps('total_bunch')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Brondolan"
                    placeholder="Brondolan"
                    rightSection="Kg"
                    {...form.getInputProps('total_brondolan')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <ColGrid span={6}>
              <ScaleGrid justify="space-around" align="center">
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Estate"
                    placeholder="Estate"
                    {...form.getInputProps('estate_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Afdeling"
                    placeholder="Afdeling"
                    {...form.getInputProps('afdeling_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Sub Block 1"
                    placeholder="Sub Block 1"
                    {...form.getInputProps('block_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Sub Block 2"
                    placeholder="Sub Block 2"
                    {...form.getInputProps('block_nm2')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Sub Block 3"
                    placeholder="Sub Block 3"
                    {...form.getInputProps('block_nm3')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <Divider label="Detail Timbangan" />
            <ColGrid span={12}>
              <ScaleGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Buah Mentah"
                    placeholder="0"
                    rightSection="Kg"
                    {...form.getInputProps('fresh_fruit')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Buah Busuk"
                    placeholder="0"
                    rightSection="Kg"
                    {...form.getInputProps('overripe_fruit')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Buah Muda"
                    placeholder="0"
                    rightSection="Kg"
                    {...form.getInputProps('young_fruit')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Tangkai Panjang"
                    placeholder="0"
                    rightSection="Kg"
                    {...form.getInputProps('long_stalk')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Janjang Kosong"
                    placeholder="0"
                    rightSection="Kg"
                    {...form.getInputProps('janjang_kosong')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Brondolan"
                    placeholder="0"
                    rightSection="%"
                    {...form.getInputProps('grading_brondolan')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Brondolan Busuk"
                    placeholder="0"
                    rightSection="%"
                    {...form.getInputProps('overripe_brondolan')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Overnight/Restan"
                    placeholder="0"
                    rightSection="%"
                    {...form.getInputProps('restan_overnight')}
                  />
                </ColGrid>
                <ColGrid span={3}>
                  <TextInput
                    disabled
                    label="Sampah"
                    placeholder="0"
                    rightSection="%"
                    {...form.getInputProps('garbage')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
        <ColGrid span={6} leftdivider="true">
          <ScaleGrid>
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
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
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
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Pemuat 1"
                    placeholder="Pemuat 1"
                    {...form.getInputProps('loader_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Pemuat 2"
                    placeholder="Pemuat 2"
                    {...form.getInputProps('loader_nm_2')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Pemuat 3"
                    placeholder="Pemuat 3"
                    {...form.getInputProps('loader_nm_3')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
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
                <ColGrid span={4}>
                  <TextInput
                    label="Kelas"
                    placeholder="Kelas"
                    {...form.getInputProps('grade_class')}
                  />
                </ColGrid>
                <ColGrid span={8}>
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
              <Textarea
                disabled={loading}
                minRows={3}
                label="Catatan"
                {...form.getInputProps('remark1')}
              />
            </ColGrid>
            <Divider label="Data Timbangan" />
            <ScaleDisplay type="scale-out" form={form} />
          </ScaleGrid>
        </ColGrid>
      </ScaleGrid>
      <Button ref={submitRef} type="submit" sx={{ display: 'none' }} />
    </FormBox>
  )
}

TbsIntiKeluar.propTypes = {
  submitRef: PropTypes.any,
  form: PropTypes.object,
  dropdownData: PropTypes.object
}

export default TbsIntiKeluar
