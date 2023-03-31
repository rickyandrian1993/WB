import React, { useEffect, useState } from 'react'
import { Divider, Select, TextInput } from '@mantine/core'
import { ColGrid, ScaleGrid } from '../../../assets/style/styled'
import PropTypes from 'prop-types'
import { commodityList } from '../../../constants'
import { findDisableList } from '../../../helpers/disableList'
import { SupplierController } from '../../../services'

const DataUmum = ({
  form,
  loading,
  isFirst,
  customer,
  vendor,
  disableList,
  setDisableList,
  setNewSupplier,
  setIsFirst
}) => {
  const [supplier, setSupplier] = useState([])
  const { getSupplierList } = SupplierController()
  const formSupplier = form.values.supplier

  useEffect(() => {
    if (loading) {
      if (!supplier.length) {
        getSupplierList(setSupplier)
      }
      if (formSupplier) {
        if (!supplier.find((item) => item.value === formSupplier)) {
          setSupplier((current) => [...current, { value: formSupplier, label: formSupplier }])
        }
      }
    }
  }, [formSupplier, getSupplierList, loading, setNewSupplier, supplier])

  return (
    <ScaleGrid>
      <Divider label="Data Umum" />
      <ColGrid span={6}>
        <ScaleGrid>
          <ColGrid span={12}>
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Komoditi"
              placeholder="Komoditi"
              searchable
              data={commodityList}
              size="sm"
              nothingFound="Tidak ada data."
              disabled={disableList.comodity_nm}
              {...form.getInputProps('comodity_nm')}
              onChange={(e) => {
                setDisableList(findDisableList(e, isFirst))
                if ((e === 'TBS Inti' || e === 'Brondolan') && !isFirst) setIsFirst(true)
                form.getInputProps('comodity_nm').onChange(e)
                form.setFieldValue('mt_comodity_cd', e)
              }}
            />
          </ColGrid>
          <ColGrid span={12}>
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Customer"
              placeholder="Customer"
              searchable
              data={customer}
              size="sm"
              nothingFound="Tidak ada data."
              disabled={disableList.pcc_customer_cd}
              {...form.getInputProps('pcc_customer_cd')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <Select
              label="Supplier"
              data={supplier}
              placeholder="Supplier"
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              nothingFound="Tidak ada data."
              searchable
              creatable
              getCreateLabel={(query) => `+ Tambah ${query}`}
              disabled={disableList.supplier}
              onCreate={(query) => {
                const item = { value: query, label: query }
                setSupplier((current) => [...current, item])
                setNewSupplier(query)
                return item
              }}
              {...form.getInputProps('supplier')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <ColGrid span={6}>
        <ScaleGrid justify="space-around" align="center">
          <ColGrid span={12}>
            <TextInput
              withAsterisk
              label="Petani"
              placeholder="Petani"
              disabled={disableList.farmer}
              {...form.getInputProps('farmer')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Jumlah Tandan"
              placeholder="Jumlah Tandan"
              disabled={disableList.total_bunch}
              {...form.getInputProps('total_bunch')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Brondolan"
              placeholder="Brondolan"
              rightSection="Kg"
              disabled={disableList.total_brondolan}
              {...form.getInputProps('total_brondolan')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <Divider />
      <ColGrid span={6}>
        <ScaleGrid>
          <ColGrid span={12}>
            <TextInput
              withAsterisk
              label="Supir"
              placeholder="Supir"
              disabled={disableList.driver_nm}
              {...form.getInputProps('driver_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Estate"
              placeholder="Estate"
              disabled={disableList.estate_nm}
              {...form.getInputProps('estate_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Afdeling"
              placeholder="Afdeling"
              disabled={disableList.afdeling_nm}
              {...form.getInputProps('afdeling_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Sub Block"
              placeholder="Sub Block"
              disabled={disableList.block_nm}
              {...form.getInputProps('block_nm')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
      <ColGrid span={6}>
        <ScaleGrid>
          <ColGrid span={12}>
            <Select
              rightSection={<i className="ri-arrow-down-s-line"></i>}
              styles={{ rightSection: { pointerEvents: 'none' } }}
              withAsterisk
              label="Ekspedisi"
              placeholder="Ekspedisi"
              searchable
              data={vendor}
              size="sm"
              nothingFound="Tidak ada data."
              disabled={disableList.mt_vndr_rent_vhcle_cd}
              {...form.getInputProps('mt_vndr_rent_vhcle_cd')}
              onChange={(e) => {
                const selectedVendor = vendor.find((item) => item.value === e)
                form.setFieldValue('ekspedisi_nm', selectedVendor.label)
                form.getInputProps('mt_vndr_rent_vhcle_cd').onChange(e)
              }}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Pemuat 1"
              placeholder="Pemuat 1"
              disabled={disableList.loader_nm}
              {...form.getInputProps('loader_nm')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Pemuat 2"
              placeholder="Pemuat 2"
              disabled={disableList.loader_nm_2}
              {...form.getInputProps('loader_nm_2')}
            />
          </ColGrid>
          <ColGrid span={12}>
            <TextInput
              label="Pemuat 3"
              placeholder="Pemuat 3"
              disabled={disableList.loader_nm_3}
              {...form.getInputProps('loader_nm_3')}
            />
          </ColGrid>
        </ScaleGrid>
      </ColGrid>
    </ScaleGrid>
  )
}

DataUmum.propTypes = {
  form: PropTypes.object,
  isFirst: PropTypes.any,
  customer: PropTypes.any,
  loading: PropTypes.bool,
  vendor: PropTypes.any,
  disableList: PropTypes.any,
  setDisableList: PropTypes.func,
  setIsFirst: PropTypes.func,
  setSupplier: PropTypes.func
}

export default DataUmum