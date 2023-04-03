import { Divider,  } from '@mantine/core'
import React from 'react'
import { ColGrid, FormBox, ScaleGrid } from '../../../assets/style/styled'
import RekapCommodity from './RekapCommodity'
import RekapTable from './RekapTable'

const Rekapitulasi = () => {
  return (
    <FormBox style={{ marginTop: '16px' }}>
      <ScaleGrid>
        <Divider label="Rekapitulasi" />
        <ColGrid span={5}>
          <RekapCommodity/>
        </ColGrid>
        <ColGrid span={7}>
          <RekapTable/>
        </ColGrid>
      </ScaleGrid>
    </FormBox>
  )
}

export default Rekapitulasi
