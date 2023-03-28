import { Select, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useEffect, useState } from 'react'
import { ColGrid, FormGroup, ScaleGrid } from '../../../assets/style/styled'
import { noPol, parseValue } from '../../../helpers/utility'
import PropTypes from 'prop-types'
import { MillYieldsController } from '../../../services'
import { findDisableList } from '../../../helpers/disableList'

const HeaderForm = ({ form, customer, loading, setLoading, setIsFirst, setDisableList }) => {
  const [history, setHistory] = useState([])
  const { getScaleHistory } = MillYieldsController()
  const vehicle_cd = form.values.pcc_vehicle_cd

  useEffect(() => {
    if (loading) {
      if (!history.length || loading) {
        getScaleHistory({}, setLoading, (res) => {
          const temp = []
          res?.forEach((data) =>
            temp.push({ value: data.pcc_vehicle_cd, label: data.pcc_vehicle_cd, data })
          )
          setHistory(temp)
        })
      }
      if (vehicle_cd) {
        if (!history.find((item) => item.value === vehicle_cd)) {
          setHistory((current) => [...current, { value: vehicle_cd, label: vehicle_cd }])
        }
      }
    }
  }, [getScaleHistory, history, loading, setLoading, vehicle_cd])

  const historyChangeHandler = (e) => {
    const selected = history.find((item) => {
      return item.value === e
    })
    form.reset()
    setIsFirst(true)
    if (!selected) {
      form.getInputProps('pcc_vehicle_cd').onChange(noPol(e))
      setDisableList(findDisableList(false))
    } else {
      form.getInputProps('pcc_vehicle_cd').onChange(selected.value)
      if (typeof selected.data !== 'undefined') {
        setIsFirst(false)
        const customerNm = customer.find((item) => item.value === selected.pcc_customer_cd)?.label
        form.setFieldValue('customer_nm', customerNm)
        const newObj = {}
        const { data } = selected
        Object.keys(data).map((item) => {
          return (newObj[item] = data[item] || '')
        })
        console.log('selected', data.comodity_nm)
        setDisableList(findDisableList(data.comodity_nm))
        parseValue(newObj, form)
      }
    }
  }

  return (
    <ScaleGrid>
      <ColGrid span={4}>
        <ScaleGrid>
          <ColGrid span={6}>
            <Select
              label="No. Polisi"
              data={history}
              placeholder="No. Polisi"
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              nothingFound="Tidak ada data."
              searchable
              creatable
              getCreateLabel={(query) => `+ Tambah ${query}`}
              onCreate={(query) => {
                const item = { value: noPol(query), label: noPol(query) }
                setHistory((current) => [...current, item])
                setIsFirst(true)
                console.log('oncreate', item, '||', query)
                return item
              }}
              {...form.getInputProps('pcc_vehicle_cd')}
              onChange={historyChangeHandler}
            />
          </ColGrid>
          <ColGrid span={6}>
            <TextInput
              disabled={loading}
              label="Kontrak"
              placeholder="Kontrak"
              {...form.getInputProps('contract')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <ColGrid span={8}>
        <ScaleGrid>
          <ColGrid span={6}>
            <FormGroup>
              <TextInput
                label="Nomor DO"
                placeholder="Nomor DO"
                {...form.getInputProps('do_number')}
                className="form-head"
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
          <ColGrid span={6}>
            <FormGroup>
              <TextInput
                label="Nomor SPB"
                placeholder="Nomor SPB"
                {...form.getInputProps('spb_number')}
                className="form-head"
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
    </ScaleGrid>
  )
}

HeaderForm.propTypes = {
  form: PropTypes.object,
  customer: PropTypes.any,
  loading: PropTypes.bool,
  setIsFirst: PropTypes.func,
  setLoading: PropTypes.func,
  setDisableList: PropTypes.func
}

export default HeaderForm
