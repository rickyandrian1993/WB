import React, { useState, useRef, useEffect } from 'react'
import { Loader, SegmentedControl } from '@mantine/core'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, CpoPkoKeluar, CpoPkoMasuk } from '../../components'
import { CustomerController, TimbanganController, VendorController } from '../../services'
import { useLocation } from 'react-router-dom'
import { findLabelPath } from '../../helpers/utility'
import { useForm } from '@mantine/form'
import { initialValues } from '../../constants/initialFormValues'

const CpoPkoPage = () => {
  const { pathname } = useLocation()
  const [path, setPath] = useState(pathname)
  const commodity = findLabelPath(pathname).cd
  const form = useForm(initialValues)
  const submitRef = useRef()
  const [inOut, setInOut] = useState('in')
  const [readTimbanganLoading, setReadTimbanganLoading] = useState(false)
  const { customer } = CustomerController()
  const { vendor } = VendorController()
  const { getTimbanganData } = TimbanganController()

  useEffect(() => {
    if (path !== pathname) {
      form.reset()
      setPath(pathname)
      setInOut('in')
    }
  }, [path, pathname, form])

  const readTimbangan = () => {
    getTimbanganData(setReadTimbanganLoading, (res) => {
      if (inOut === 'in') form.setFieldValue('first_w', res)
      else {
        form.setValues((prev) => ({
          ...prev,
          netto_w: Math.abs(form.values.first_w - res),
          second_w: res
        }))
      }
    })
  }

  return (
    <ScaleGrid align="center">
      {/* Header Button */}
      <ColGrid className="bg-transparent button-header-wrapper" span={2}>
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
          className="bg-transparent"
          value={inOut}
          onChange={(e) => {
            form.reset()
            setInOut(e)
          }}
          data={[
            { label: 'Timbangan Masuk', value: 'in' },
            { label: 'Timbangan Keluar', value: 'out' }
          ]}
          radius={12}
          fullWidth
        />
      </ColGrid>
      <ColGrid className="bg-transparent button-header-wrapper" span={4}>
        <ButtonWB
          fullWidth
          variant="outline"
          size="sm"
          leftIcon={<i className="ri-truck-line" />}
          onClick={readTimbangan}
          disabled={readTimbanganLoading}
        >
          {readTimbanganLoading ? <Loader color="#fff" variant="bars" size="sm" /> : 'Timbang'}
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
          <CpoPkoMasuk
            commodity={commodity}
            submitRef={submitRef}
            form={form}
            dropdownData={{ customer: customer, vendor: vendor }}
          />
        ) : (
          <CpoPkoKeluar
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

export default CpoPkoPage
