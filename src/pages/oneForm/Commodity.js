import { Divider, Loader } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState } from 'react'
import { ColGrid, FormBox, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, ScaleDisplay } from '../../components'
import { initialValues } from '../../constants'
import { allTrue } from '../../helpers/disableList'
import submiter from '../../helpers/submiter'
import { getStore } from '../../helpers/utility'
import {
  CustomerController,
  MillYieldsController,
  NFCReaderController,
  SupplierController,
  TimbanganController,
  VehicleCdController,
  VendorController
} from '../../services'
import { DataTambahan, DataUmum, Grading, HeaderForm, Kualitas, Rekapitulasi } from './Sections'

const Commodity = () => {
  const form = useForm(initialValues)
  const [loading, setLoading] = useState(true)
  const [readTimbanganLoading, setReadTimbanganLoading] = useState(false)
  const [isFirst, setIsFirst] = useState(false)
  const [disableList, setDisableList] = useState(allTrue)
  const [newHistory, setNewHistory] = useState([])
  const [newSupplier, setNewSupplier] = useState([])

  const { user } = getStore('accountInfo')
  const { customer } = CustomerController()
  const { vendor } = VendorController()
  const { readNFC } = NFCReaderController()
  const { getTimbanganData } = TimbanganController()
  const { insertData, updateData } = MillYieldsController()
  const { insertVehicleCd } = VehicleCdController()
  const { insertSupplierList } = SupplierController()

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
      }
    })
  }

  const nfcReader = () => {
    readNFC(isFirst ? false : true, setLoading, form)
  }

  const submitHandler = (values) => {
    const { firstWeightPayload, secondWeightPayload } = submiter(values)
    if (form.validate().hasErrors) return
    if (newHistory === form.values.pcc_vehicle_cd)
      insertVehicleCd({ cd: newHistory, created_by: user.nm }, setLoading)
    if (newSupplier === form.values.supplier)
      insertSupplierList({ name: newHistory, created_by: user.nm }, setLoading)
    if (isFirst) insertData(firstWeightPayload(), setLoading, form)
    else updateData(secondWeightPayload(), setLoading)
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
              setNewHistory={setNewHistory}
            />
          </ColGrid>
          <ColGrid span={5}>
            <DataUmum
              form={form}
              customer={customer}
              vendor={vendor}
              loading={loading}
              setDisableList={setDisableList}
              isFirst={isFirst}
              setNewSupplier={setNewSupplier}
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