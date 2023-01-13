import React, { useState } from 'react'
import { Button, Divider, NumberInput, Select, Textarea, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { ColGrid, FormBox, FormGroup, ScaleGrid } from '../../../../assets/style/styled'
import { MillYieldsController } from '../../../../services'
import { dateFormat } from '../../../../helpers/utility'
import PropTypes from 'prop-types'
import ScaleDisplay from '../../../scaleDisplay/ScaleDisplay'
import 'dayjs/locale/id'

const TbsLuarMasuk = ({ commodity, submitRef, form, dropdownData }) => {
  const { customer, vendor } = dropdownData
  const [loading, setLoading] = useState(false)
  const { insertData } = MillYieldsController()

  const submitHandler = (values) => {
    if (form.validate().hasErrors) return
    const payload = {
      data: {
        ...values,
        comodity_nm: commodity,
        do_date: values.do_date && dateFormat(values.do_date, 'Y-MM-DD'),
        mt_comodity_cd: commodity,
        spb_date: values.spb_date && dateFormat(values.spb_date, 'Y-MM-DD')
      },
      evac_act_dtl: {}
    }
    insertData(payload, setLoading, form)
  }

  return (
    <FormBox onSubmit={form.onSubmit(submitHandler)}>
      <ScaleGrid gutter={'md'} justify="space-between" align="stretch">
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
        <ColGrid span={6}>
          <ScaleGrid>
            <Divider label="Data NFC" />
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
                    disabled={loading}
                    label="Petani"
                    placeholder="Petani"
                    {...form.getInputProps('farmer')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <NumberInput
                    withAsterisk
                    disabled={loading}
                    min={0}
                    label="Jumlah Tandan"
                    hideControls
                    {...form.getInputProps('total_bunch')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <NumberInput
                    disabled={loading}
                    min={0}
                    label="Brondolan"
                    hideControls
                    rightSection="Kg"
                    {...form.getInputProps('total_brondolan')}
                  />
                </ColGrid>
              </ScaleGrid>
            </ColGrid>
            <ColGrid span={6}>
              <ScaleGrid>
                <ColGrid span={12}>
                  <TextInput
                    withAsterisk
                    disabled={loading}
                    label="Supir"
                    placeholder="Supir"
                    {...form.getInputProps('driver_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    disabled={loading}
                    label="Pemuat"
                    placeholder="Pemuat"
                    {...form.getInputProps('loader_nm')}
                  />
                </ColGrid>
                <ColGrid span={12}>
                  <TextInput
                    withAsterisk
                    disabled={loading}
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
            <ScaleDisplay type="scale-in" form={form} spanSize={12} />
          </ScaleGrid>
        </ColGrid>
        <Button ref={submitRef} type="submit" sx={{ display: 'none' }} />
      </ScaleGrid>
    </FormBox>
  )
}

TbsLuarMasuk.propTypes = {
  commodity: PropTypes.string,
  dropdownData: PropTypes.object,
  form: PropTypes.object,
  submitRef: PropTypes.any
}

export default TbsLuarMasuk
