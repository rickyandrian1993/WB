import React from 'react'
import { Divider, TextInput, NumberInput, Textarea } from '@mantine/core'
import { ColGrid, ScaleGrid } from '../../../assets/style/styled'
import PropTypes from 'prop-types'

const DataTambahan = ({ form, loading, disableList }) => {
  return (
    <ScaleGrid>
      <Divider label="Data Tambahan" />
      <ColGrid span="auto">
        <TextInput
          label="No Seal"
          placeholder="No Seal"
          disabled={disableList.seal_number}
          {...form.getInputProps('seal_number')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <TextInput
          label="Kelas"
          placeholder="Kelas"
          disabled={disableList.grade_class}
          {...form.getInputProps('grade_class')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <NumberInput
          min={0}
          label="Berat SPB"
          hideControls
          rightSection="Kg"
          disabled={disableList.spb_weight}
          {...form.getInputProps('spb_weight')}
        />
      </ColGrid>
      <ColGrid span="auto">
        <NumberInput
          min={0}
          label="Selisih Berat"
          hideControls
          rightSection="Kg"
          disabled={disableList.weight_gap}
          {...form.getInputProps('weight_gap')}
        />
      </ColGrid>
      <ColGrid span={5}>
        <Textarea
          minRows={1}
          label="Catatan"
          disabled={disableList.remark1}
          {...form.getInputProps('remark1')}
        />
      </ColGrid>
    </ScaleGrid>
  )
}

DataTambahan.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  disableList: PropTypes.any
}

export default DataTambahan
