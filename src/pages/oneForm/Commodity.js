import { Divider, Loader } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { ColGrid, FormBox, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, ScaleDisplay } from '../../components'
import { initialValues } from '../../constants'
import { allTrue } from '../../helpers/disableList'
import submiter from '../../helpers/submiter'
import {
  CustomerController,
  MillYieldsController,
  NFCReaderController,
  TimbanganController,
  VendorController
} from '../../services'
import { DataTambahan, DataUmum, Grading, HeaderForm, Kualitas, Rekapitulasi } from './Sections'

const Commodity = () => {
  const form = useForm(initialValues)
  const [loading, setLoading] = useState(true)
  const [readTimbanganLoading, setReadTimbanganLoading] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [disableList, setDisableList] = useState(allTrue)

  const { customer } = CustomerController()
  const { vendor } = VendorController()
  const { readNFC } = NFCReaderController()
  const { getTimbanganData } = TimbanganController()
  const { insertData, updateData } = MillYieldsController()

  const readTimbangan = () => {
    getTimbanganData(setReadTimbanganLoading, (res) => {
      if (isFirst) form.setFieldValue('first_w', res)
      else {
        const { first_w, total_bunch } = form.values
        let netto_w = Math.abs(+first_w - res)
        let bjr = (netto_w / total_bunch).toFixed(2)
        form.setValues((prev) => ({
          ...prev,
          after_cut: netto_w,
          netto_w,
          second_w: res,
          bjr
        }))
        console.log('Form', form)
      }
    })
  }

  const nfcReader = () => {
    readNFC(isFirst ? false : true, setLoading, form)
  }

  const submitHandler = (values) => {
    const { firstWeightPayload, secondWeightPayload } = submiter(values)
    if (form.validate().hasErrors) return
    isFirst
      ? insertData(firstWeightPayload(), setLoading, form)
      : updateData(secondWeightPayload(), setLoading)
  }

  return (
    <>
      <FormBox onSubmit={form.onSubmit(submitHandler)}>
        <ScaleGrid gutter={'md'} justify="space-between" align="start">
          <ColGrid span={12}>
            <HeaderForm
              form={form}
              customer={customer}
              loading={loading}
              setLoading={setLoading}
              setIsFirst={setIsFirst}
              setDisableList={setDisableList}
            />
          </ColGrid>
          <ColGrid span={5}>
            <DataUmum
              form={form}
              customer={customer}
              vendor={vendor}
              setDisableList={setDisableList}
              isFirst={isFirst}
              setIsFirst={setIsFirst}
              disableList={disableList}
            />
            <ScaleGrid>
              <Divider />
              <ColGrid span={6}>
                <ButtonWB
                  fullWidth
                  variant="outline"
                  size="sm"
                  color="red"
                  leftIcon={<i className="ri-format-clear" />}
                  disabled={loading}
                  onClick={() => {
                    form.reset()
                    setDisableList(allTrue)
                  }}
                >
                  Bersihkan
                </ButtonWB>
              </ColGrid>
              <ColGrid span={6}>
                <ButtonWB
                  fullWidth
                  variant="outline"
                  size="sm"
                  leftIcon={<i className="ri-sim-card-2-line" />}
                  onClick={nfcReader}
                  disabled={readTimbanganLoading || disableList.nfc_button}
                >
                  {loading ? <Loader variant="bars" color="#fff" /> : 'NFC'}
                </ButtonWB>
              </ColGrid>
              <ColGrid span={6}>
                <ButtonWB
                  fullWidth
                  variant="outline"
                  size="sm"
                  leftIcon={<i className="ri-truck-line" />}
                  onClick={readTimbangan}
                  disabled={loading}
                >
                  {readTimbanganLoading ? <Loader color="#fff" variant="bars" /> : 'Timbang'}
                </ButtonWB>
              </ColGrid>
              <ColGrid span={6}>
                <ButtonWB
                  fullWidth
                  variant="outline"
                  color="green"
                  size="sm"
                  disabled={loading}
                  type="submit"
                  leftIcon={<i className="ri-save-line" />}
                >
                  Simpan
                </ButtonWB>
              </ColGrid>
            </ScaleGrid>
          </ColGrid>
          <ColGrid span={7} leftdivider="true">
            <ScaleGrid>
              <Divider label="Data Timbangan" />
              <ScaleDisplay type="scale-out" form={form} />
              <ColGrid span={12}>
                <Grading form={form} disableList={disableList} />
              </ColGrid>
              <ColGrid span={12}>
                <Kualitas form={form} loading={loading} disableList={disableList} />
              </ColGrid>
              <ColGrid span={12}>
                <DataTambahan form={form} loading={loading} disableList={disableList} />
              </ColGrid>
            </ScaleGrid>
          </ColGrid>
        </ScaleGrid>
      </FormBox>
      <Rekapitulasi />
    </>
  )
}

export default Commodity
