import { Loader, SegmentedControl } from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB, NonCommodityKeluar, NonCommodityMasuk } from '../../components'
import { initialValues } from '../../constants'
import { findLabelPath } from '../../helpers/utility'
import { CustomerController, TimbanganController, VendorController } from '../../services'

export default function NonCommodityPage() {
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
      <ColGrid className="neu-green-inside button-header-wrapper" span={2}>
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
          className="neu-green-inside button-header-wrapper"
          span={4}
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
      <ColGrid>
        {inOut === 'in' ? (
          <NonCommodityMasuk
            commodity={commodity}
            submitRef={submitRef}
            form={form}
            dropdownData={{ customer: customer, vendor: vendor }}
          />
        ) : (
          <NonCommodityKeluar
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
