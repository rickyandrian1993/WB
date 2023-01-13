import React from 'react'
import 'dayjs/locale/id'
import { Button, Divider, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useState } from 'react'
import { ColGrid, FormBox, FormGroup, ScaleGrid } from '../../../../assets/style/styled'
import { MillYieldsController } from '../../../../services'
import PropTypes from 'prop-types'
import ScaleDisplay from '../../../scaleDisplay/ScaleDisplay'
import { dateFormat, trimPayload } from '../../../../helpers/utility'
import { defaultKeyInitialValue } from '../../../../constants/basePayload'

const TbsIntiMasuk = ({ commodity, submitRef, form, dropdownData }) => {
  const { customer, vendor } = dropdownData
  const [loading, setLoading] = useState(false)
  const { insertData } = MillYieldsController()

  const submitHandler = (values) => {
    const trimmedValue = trimPayload(values, defaultKeyInitialValue)
    if (form.validate().hasErrors) return
    const payload = {
      data: {
        ...trimmedValue,
        comodity_nm: commodity,
        do_date: values.do_date && dateFormat(values.do_date, 'Y-MM-DD'),
        mt_comodity_cd: commodity,
        spb_date: values.spb_date && dateFormat(values.spb_date, 'Y-MM-DD')
      },
      evac_act_dtl: form.values?.child_data
    }
    insertData(payload, setLoading, form)
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
                  label="Nomor DO"
                  placeholder="Nomor DO"
                  {...form.getInputProps('do_number')}
                />
                <DatePicker
                  label="Tanggal DO"
                  locale="id"
                  placeholder="Tanggal DO"
                  icon={<i className="ri-calendar-event-line" />}
                  {...form.getInputProps('do_date')}
                />
              </FormGroup>
            </ColGrid>
            <ColGrid span={5}>
              <FormGroup>
                <TextInput
                  label="Nomor SPB"
                  placeholder="Nomor SPB"
                  {...form.getInputProps('spb_number')}
                />
                <DatePicker
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
                    disabled={loading}
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
                  <TextInput
                    withAsterisk
                    disabled
                    label="No. Kendaraan"
                    placeholder="No. Kendaraan"
                    {...form.getInputProps('pcc_vehicle_cd')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <Select
                    rightSection={<i className="ri-arrow-down-s-line"></i>}
                    disabled={loading}
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
          </ScaleGrid>
          <ScaleGrid>
            <Divider label="Data Tambahan" />
            <ColGrid span={4}>
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
            <ColGrid span={4}>
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
            <ScaleDisplay type="scale-in" form={form} />
          </ScaleGrid>
        </ColGrid>
        <Button ref={submitRef} type="submit" sx={{ display: 'none' }} />
      </ScaleGrid>
    </FormBox>
  )
}

TbsIntiMasuk.propTypes = {
  commodity: PropTypes.string,
  submitRef: PropTypes.any,
  form: PropTypes.object,
  dropdownData: PropTypes.object
}

export default TbsIntiMasuk
