import React, { useState, useRef, useEffect } from 'react'
import { Loader, SegmentedControl } from '@mantine/core'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, TbsIntiKeluar, TbsIntiMasuk } from '../../components'
import {
  CustomerController,
  NFCReaderController,
  TimbanganController,
  VendorController
} from '../../services'
import { useLocation } from 'react-router-dom'
import { findLabelPath } from '../../helpers/utility'
import { useForm } from '@mantine/form'
import { initialValues } from '../../constants/initialFormValues'

const TbsIntiPage = () => {
  const { pathname } = useLocation()
  const { readNFC } = NFCReaderController()
  const [path, setPath] = useState(pathname)
  const [inOut, setInOut] = useState('in')
  const [readTimbanganLoading, setReadTimbanganLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const commodity = findLabelPath(pathname).cd
  const form = useForm(initialValues)
  const submitRef = useRef()
  const { customer } = CustomerController()
  const { vendor } = VendorController()
  const { getTimbanganData } = TimbanganController()

  useEffect(() => {
    if (path !== pathname) {
      form.reset()
      setPath(pathname)
      setInOut('in')
    }
    if (commodity) {
      form.setFieldValue('comodity_nm', commodity)
    }
  }, [path, pathname, form, commodity])

  const readTimbangan = () => {
    getTimbanganData(setReadTimbanganLoading, (res) => {
      if (inOut === 'in') form.setFieldValue('first_w', res)
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
    readNFC(inOut === 'in' ? false : true, setLoading, form)
  }
  return (
    <ScaleGrid align="center">
      {/* Header Button */}
      <ColGrid className="neu-green-inside button-header-wrapper" span={2}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          color="red"
          leftIcon={<i className="ri-format-clear" />}
          onClick={() => form.reset()}
        >
          Bersihkan
        </ButtonWB>
      </ColGrid>
      <ColGrid span={6}>
        <SegmentedControl
          className="neu-green-inside"
          value={inOut}
          onChange={(e) => {
            form.reset()
            setInOut(e)
          }}
          data={[
            { label: 'Timbangan Masuk', value: 'in' },
            { label: 'Timbangan Keluar', value: 'out' }
          ]}
          radius="xl"
          fullWidth
        />
      </ColGrid>
      <ColGrid className="neu-green-inside button-header-wrapper" span={4}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          leftIcon={<i className="ri-sim-card-2-line" />}
          onClick={nfcReader}
          disabled={loading}
        >
          {loading ? <Loader variant="bars" color="#fff" /> : 'NFC'}
        </ButtonWB>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          leftIcon={<i className="ri-truck-line" />}
          onClick={readTimbangan}
          disabled={readTimbanganLoading}
        >
          {readTimbanganLoading ? <Loader color="#fff" variant="bars" /> : 'Timbang'}
        </ButtonWB>
        <ButtonWB
          fullWidth
          variant="outline"
          color="green"
          size="sm"
          leftIcon={<i className="ri-save-line" />}
          onClick={() => {
            submitRef.current.click()
          }}
        >
          Simpan
        </ButtonWB>
      </ColGrid>
      {/* Form */}
      <ColGrid>
        {inOut === 'in' ? (
          <TbsIntiMasuk
            commodity={commodity}
            submitRef={submitRef}
            form={form}
            dropdownData={{ customer: customer, vendor: vendor }}
          />
        ) : (
          <TbsIntiKeluar
            commodity={commodity}
            submitRef={submitRef}
            form={form}
            dropdownData={{ customer: customer, vendor: vendor }}
          />
        )}
      </ColGrid>
    </ScaleGrid>
  )
}

export default TbsIntiPage
