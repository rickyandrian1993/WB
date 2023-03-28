import { Divider, TextInput } from '@mantine/core'
import React from 'react'
import { ColGrid, FormBox, FormGroup, ScaleGrid } from '../../../assets/style/styled'

const Rekapitulasi = () => {
  return (
    <FormBox style={{ marginTop: '16px' }}>
      <ScaleGrid>
        <Divider label="Rekapitulasi" />
        <ColGrid span={4}>
          <ScaleGrid>
            <ColGrid span={6}>
              <FormGroup>
                <TextInput
                  disabled
                  label="TBS"
                  placeholder="0"
                  rightSection="Pcs"
                  className="form-rekapitulasi"
                />
                <TextInput disabled placeholder="0" rightSection="Kg" />
              </FormGroup>
            </ColGrid>
            <ColGrid span={6}>
              <FormGroup>
                <TextInput
                  disabled
                  label="CPO"
                  placeholder="0"
                  rightSection="Pcs"
                  className="form-rekapitulasi"
                />
                <TextInput disabled placeholder="0" rightSection="Kg" />
              </FormGroup>
            </ColGrid>
            <ColGrid span={6}>
              <FormGroup>
                <TextInput
                  disabled
                  label="Kernel"
                  placeholder="0"
                  rightSection="Pcs"
                  className="form-rekapitulasi"
                />
                <TextInput disabled placeholder="0" rightSection="Kg" />
              </FormGroup>
            </ColGrid>
            <ColGrid span={6}>
              <FormGroup>
                <TextInput
                  disabled
                  label="RBD/0"
                  placeholder="0"
                  rightSection="Pcs"
                  className="form-rekapitulasi"
                />
                <TextInput disabled placeholder="0" rightSection="Kg" />
              </FormGroup>
            </ColGrid>
            <ColGrid span={6}>
              <FormGroup>
                <TextInput
                  disabled
                  label="ST/FA"
                  placeholder="0"
                  rightSection="Pcs"
                  className="form-rekapitulasi"
                />
                <TextInput disabled placeholder="0" rightSection="Kg" />
              </FormGroup>
            </ColGrid>
            <ColGrid span={6}>
              <FormGroup>
                <TextInput
                  disabled
                  label="CK"
                  placeholder="0"
                  rightSection="Pcs"
                  className="form-rekapitulasi"
                />
                <TextInput disabled placeholder="0" rightSection="Kg" />
              </FormGroup>
            </ColGrid>
          </ScaleGrid>
        </ColGrid>
        <ColGrid span={8}></ColGrid>
      </ScaleGrid>
    </FormBox>
  )
}

export default Rekapitulasi
