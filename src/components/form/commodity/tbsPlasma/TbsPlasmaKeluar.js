import { Button, Divider, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ColGrid, FormBox, FormGroup, ScaleGrid } from '../../../../assets/style/styled'
import { dateFormat, isNaNToZero, parseValue } from '../../../../helpers/utility'
import { MillYieldsController } from '../../../../services'
import ScaleDisplay from '../../../scaleDisplay/ScaleDisplay'

const TbsPlasmaKeluar = ({ commodity, submitRef, form, dropdownData }) => {
  const { customer, vendor } = dropdownData
  const [history, setHistory] = useState([])
  const [dropdownHistory, setDropdownHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [vehicleSelected, setVehicleSelected] = useState(null)
  const cutVariable = useRef({
    fresh_fruit: 0,
    garbage: 0,
    grading_brondolan: 0,
    janjang_kosong: 0,
    long_stalk: 0,
    restan_overnight: 0,
    overripe_brondolan: 0,
    overripe_fruit: 0,
    sand_fruit: 0,
    young_fruit: 0,
    water: 0
  })
  const [cutWeight, setCutWeight] = useState({
    fresh_fruit_kg: 0,
    garbage_kg: 0,
    grading_brondolan_kg: 0,
    janjang_kosong_kg: 0,
    long_stalk_kg: 0,
    restan_overnight_kg: 0,
    overripe_brondolan_kg: 0,
    overripe_fruit_kg: 0,
    sand_fruit_kg: 0,
    young_fruit_kg: 0,
    water_kg: 0
  })

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

  const getCutWeight = (val) => {
    const {
      fresh_fruit,
      garbage,
      grading_brondolan,
      janjang_kosong,
      long_stalk,
      restan_overnight,
      overripe_brondolan,
      overripe_fruit,
      sand_fruit,
      young_fruit,
      water
    } = val
    let bjr = isNaNToZero(form.values?.bjr)
    let netto = isNaNToZero(form.values?.netto_w)
    let tempRottenKg = Math.round(0.25 * ((overripe_fruit * bjr) / netto - 0.05) * netto) || 0
    let tempRottenBrondolan = Math.round((overripe_brondolan / 100) * (overripe_fruit + 0.25))
    let calculate = {
      fresh_fruit_kg: Math.round(+fresh_fruit * bjr * 0.5),
      garbage_kg: Math.round(+garbage * 2),
      grading_brondolan_kg: Math.round(0.3 * netto * (0.125 - grading_brondolan / 100)),
      janjang_kosong_kg: Math.round(+janjang_kosong * bjr),
      long_stalk_kg: Math.round(+long_stalk * bjr * 0.01),
      overripe_fruit_kg: tempRottenKg > 0 ? tempRottenKg : 0,
      restan_overnight_kg: Math.round((+restan_overnight / 100) * netto),
      overripe_brondolan_kg: tempRottenBrondolan > 0 ? tempRottenBrondolan : 0,
      water_kg: Math.round((+water / 100) * netto),
      sand_fruit_kg: Math.round(+sand_fruit * bjr * 0.7),
      young_fruit_kg: Math.round(+young_fruit * bjr * 0.5)
    }
    setCutWeight(calculate)
    let total_cut = 0
    Object.keys(calculate).map((items) => {
      return (total_cut = total_cut + calculate[items])
    })
    cutVariable.current = { ...cutVariable.current, total_cut }
    form.setFieldValue('cut', total_cut)
    form.setFieldValue('after_cut', +netto - +total_cut)
    Object.keys(calculate).map((items) => form.setFieldValue(items, calculate[items]))
  }

  const handleCalculateInput = (value, name) => {
    const num = +value
    let obj = {}
    obj[name] = num
    form.getInputProps(name).onChange(num)
    cutVariable.current = { ...cutVariable.current, ...obj }
    getCutWeight(cutVariable.current)
  }

  const historyChangeHandler = (e) => {
    const selected = history.find((item) => item.cd === e)
    const customerNm = customer.find((item) => item.value === selected.pcc_customer_cd)?.label
    form.setFieldValue('customer_nm', customerNm)
    const newObj = {}
    Object.keys(selected).map((item) => {
      if (item !== 'updated_by' && item !== 'updated_dt')
        return (newObj[item] = selected[item] || '')
      else return null
    })
    parseValue(newObj, form)
    setVehicleSelected(e)
    const data = selected
    const tempCutWeight = {}
    Object.keys(data).map((item) => {
      if (Object.keys(cutWeight).find((key) => item === key)) {
        tempCutWeight[item] = +data[item]
      }
      return null
    })
    setCutWeight(tempCutWeight)
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
            <Divider label="Detail Kendaraan" />
            <ColGrid span={12}>
              <ScaleGrid>
                <ColGrid span={6}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    value={vehicleSelected}
                    disabled={loading}
                    label="No. Polisi"
                    placeholder="No. Polisi"
                    searchable
                    data={dropdownHistory}
                    size="sm"
                    nothingFound="Tidak ada data."
                    onChange={historyChangeHandler}
                  />
                </ColGrid>
                <ColGrid span={6}>
                  <TextInput
                    withAsterisk
                    disabled
                    label="Supir"
                    placeholder="Supir"
                    {...form.getInputProps('driver_nm')}
                  />
                </ColGrid>
                <ColGrid span={6}>
                  <TextInput
                    disabled
                    label="Pemuat"
                    placeholder="Pemuat"
                    {...form.getInputProps('loader_nm')}
                  />
                </ColGrid>
                <ColGrid span={6}>
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
            <Divider label="Data Panen" />
            <ColGrid span={6}>
              <ScaleGrid>
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
                <ColGrid span={12}>
                  <TextInput
                    disabled
                    label="Petani"
                    placeholder="Petani"
                    {...form.getInputProps('farmer')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <NumberInput
                    withAsterisk
                    disabled
                    min={0}
                    label="Jumlah Tandan"
                    hideControls
                    {...form.getInputProps('total_bunch')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <NumberInput
                    disabled
                    min={0}
                    label="Brondolan"
                    hideControls
                    rightSection="Kg"
                    {...form.getInputProps('total_brondolan')}
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
                    label="No Seals"
                    placeholder="No Seals"
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
        <Divider label="Mill Grading / Potongan" />
        <ColGrid span={12}>
          <ScaleGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="fresh_fruit"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Buah Mentah"
                  hideControls
                  rightSection="tdn"
                  {...form.getInputProps('fresh_fruit')}
                  onChange={(e) => handleCalculateInput(e, 'fresh_fruit')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.fresh_fruit_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="overripe_fruit"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Buah Busuk"
                  hideControls
                  rightSection="tdn"
                  {...form.getInputProps('overripe_fruit')}
                  onChange={(e) => handleCalculateInput(e, 'overripe_fruit')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.overripe_fruit_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="young_fruit"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Buah Muda"
                  hideControls
                  rightSection="tdn"
                  {...form.getInputProps('young_fruit')}
                  onChange={(e) => handleCalculateInput(e, 'young_fruit')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.young_fruit_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="sand_fruit"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Buah Pasir"
                  hideControls
                  rightSection="tdn"
                  {...form.getInputProps('sand_fruit')}
                  onChange={(e) => handleCalculateInput(e, 'sand_fruit')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.sand_fruit_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="long_stalk"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Tangkai Panjang"
                  hideControls
                  rightSection="tdn"
                  {...form.getInputProps('long_stalk')}
                  onChange={(e) => handleCalculateInput(e, 'long_stalk')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.long_stalk_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="janjang_kosong"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Janjang Kosong"
                  hideControls
                  rightSection="tdn"
                  {...form.getInputProps('janjang_kosong')}
                  onChange={(e) => handleCalculateInput(e, 'janjang_kosong')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.janjang_kosong_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="water"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="TBS Berair"
                  hideControls
                  rightSection="%"
                  decimalSeparator="."
                  precision={2}
                  max={100}
                  {...form.getInputProps('water')}
                  onChange={(e) => handleCalculateInput(e, 'water')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.water_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="grading_brondolan"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Brondolan"
                  hideControls
                  rightSection="%"
                  decimalSeparator="."
                  precision={2}
                  max={100}
                  {...form.getInputProps('grading_brondolan')}
                  onChange={(e) => handleCalculateInput(e, 'grading_brondolan')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.grading_brondolan_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="overripe_brondolan"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Brondolan Busuk"
                  hideControls
                  rightSection="%"
                  decimalSeparator="."
                  precision={2}
                  max={100}
                  {...form.getInputProps('overripe_brondolan')}
                  onChange={(e) => handleCalculateInput(e, 'overripe_brondolan')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.overripe_brondolan_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="restan_overnight"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Overnight/Restan"
                  hideControls
                  rightSection="%"
                  decimalSeparator="."
                  precision={2}
                  max={100}
                  {...form.getInputProps('restan_overnight')}
                  onChange={(e) => handleCalculateInput(e, 'restan_overnight')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.restan_overnight_kg} />
              </FormGroup>
            </ColGrid>
            <ColGrid span={4}>
              <FormGroup>
                <NumberInput
                  name="garbage"
                  disabled={!vehicleSelected || loading || !+form.values?.second_w}
                  min={0}
                  label="Sampah"
                  hideControls
                  {...form.getInputProps('garbage')}
                  onChange={(e) => handleCalculateInput(e, 'garbage')}
                />
                <TextInput disabled rightSection="Kg" value={cutWeight.garbage_kg} />
              </FormGroup>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
      </ScaleGrid>
      <Button ref={submitRef} type="submit" sx={{ display: 'none' }} />
    </FormBox>
  )
}

TbsPlasmaKeluar.propTypes = {
  commodity: PropTypes.string,
  scale: PropTypes.any,
  nfcData: PropTypes.any,
  submitRef: PropTypes.any
}

export default TbsPlasmaKeluar
