import { TextInput } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { ColGrid, FormGroup, ScaleGrid } from '../../../assets/style/styled'
import { RekapitulasiController } from '../../../services'

export default function RekapCommodity(props) {
  const { rekapCommodity } = RekapitulasiController()
  const [data, setData] = useState(null)

  useEffect(() => {
      rekapCommodity(setData)
  }, [props.loading, rekapCommodity])
  return (
    <ScaleGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            disabled
            label="TBS"
            value={!data?.TBS?.total_kendaraan ? 0 : data.TBS?.total_kendaraan}
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            disabled
            value={!data?.TBS?.total_berat ? 0 : data.TBS?.total_berat}
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.CPO?.total_kendaraan ? 0 : data.CPO?.total_kendaraan}
            disabled
            label="CPO"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.CPO?.total_berat ? 0 : data.CPO?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.CPKO?.total_kendaraan ? 0 : data.CPKO?.total_kendaraan}
            disabled
            label="CPKO"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.CPKO?.total_berat ? 0 : data.CPKO?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.CPKE?.total_kendaraan ? 0 : data.CPKE?.total_kendaraan}
            disabled
            label="CPKE"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.CPKE?.total_berat ? 0 : data.CPKE?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.Kernel?.total_kendaraan ? 0 : data.Kernel?.total_kendaraan}
            disabled
            label="Kernel"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.Kernel?.total_berat ? 0 : data.Kernel?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.RBDPO?.total_kendaraan ? 0 : data.RBDPO?.total_kendaraan}
            disabled
            label="RBD"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.RBDPO?.total_berat ? 0 : data.RBDPO?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.Solar?.total_kendaraan ? 0 : data.Solar?.total_kendaraan}
            disabled
            label="Solar"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.Solar?.total_berat ? 0 : data.Solar?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.Solid?.total_kendaraan ? 0 : data.Solid?.total_kendaraan}
            disabled
            label="Solid"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.Solid?.total_berat ? 0 : data.Solid?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.OLEINS?.total_kendaraan ? 0 : data.OLEINS?.total_kendaraan}
            disabled
            label="OLEINS"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.OLEINS?.total_berat ? 0 : data.OLEINS?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.Stearin?.total_kendaraan ? 0 : data.Stearin?.total_kendaraan}
            disabled
            label="Stearin"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.Stearin?.total_berat ? 0 : data.Stearin?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.PFAD?.total_kendaraan ? 0 : data.PFAD?.total_kendaraan}
            disabled
            label="PFAD"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.PFAD?.total_berat ? 0 : data.PFAD?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.Cangkang?.total_kendaraan ? 0 : data.Cangkang?.total_kendaraan}
            disabled
            label="Cangkang"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.Cangkang?.total_berat ? 0 : data.Cangkang?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={6}>
        <FormGroup>
          <TextInput
            value={!data?.Others?.total_kendaraan ? 0 : data.Others?.total_kendaraan}
            disabled
            label="Jangkos/Lain"
            placeholder="0"
            rightSection="Pcs"
            className="field-rekapitulasi"
          />
          <TextInput
            value={!data?.Others?.total_berat ? 0 : data.Others?.total_berat}
            disabled
            placeholder="0"
            rightSection="Kg"
          />
        </FormGroup>
      </ColGrid>
    </ScaleGrid>
  )
}
