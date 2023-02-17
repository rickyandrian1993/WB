import { Loader, SegmentedControl } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, TbsPlasmaKeluar, TbsPlasmaMasuk } from '../../components'
import { initialValues } from '../../constants/initialFormValues'
import { findLabelPath } from '../../helpers/utility'
import { CustomerController, TimbanganController, VendorController } from '../../services'

const TbsPlasmaPage = () => {
  const { pathname, state } = useLocation()
  const [path, setPath] = useState(pathname)
  const commodity = findLabelPath(pathname).cd
  const form = useForm(initialValues)
  const submitRef = useRef()
  const [inOut, setInOut] = useState(state || 'in')
  const [readTimbanganLoading, setReadTimbanganLoading] = useState(false)
  const { customer } = CustomerController()
  const { vendor } = VendorController()
  const { getTimbanganData } = TimbanganController()

  const readTimbangan = () => {
    getTimbanganData(setReadTimbanganLoading, (res) => {
      if (inOut === 'in') form.setFieldValue('first_w', res)
      else {
        const netto = Math.abs(form.values.first_w - res)
        const bjr = (netto / +form.values.total_bunch).toFixed(2)
        form.setValues((prev) => ({
          ...prev,
          bjr: bjr === 'Infinity' ? 0 : bjr,
          netto_w: netto,
          second_w: res
        }))
      }
    })
  }

  useEffect(() => {
    if (path !== pathname) {
      form.reset()
      setPath(pathname)
      setInOut('in')
    }
  }, [path, pathname, form, commodity])

  return (
    <ScaleGrid align="center">
      {/* Header Button */}
      <ColGrid className="bg-transparent button-header-wrapper" span={2}>
        <ButtonWB
          fullWidth
          variant="outline"
          radius={50}
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
          radius={50}
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
          radius={50}
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
          <TbsPlasmaMasuk
            commodity={commodity}
            submitRef={submitRef}
            form={form}
            dropdownData={{ customer: customer, vendor: vendor }}
          />
        ) : (
          <TbsPlasmaKeluar
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

export default TbsPlasmaPage
