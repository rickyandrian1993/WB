import { Select } from '@mantine/core'
import React from 'react'
import PropTypes from 'prop-types'
import { ColGrid, ScaleGrid } from '../../../../assets/style/styled'
import { SupplierController } from '../../../../services'
import { ReportSectionContent } from '../../ReportStyles'
import Rincian from './Rincian'

export default function TbsLuarPlasmaUSBReport(props) {
  const {
    data,
    payloads: { payload, setPayload }
  } = props
  const { supplier } = SupplierController()

  return (
    <ReportSectionContent>
      <ScaleGrid align="center" style={{ padding: '16px 0px' }}>
        <ColGrid span={2}>
          <Select
            rightSection={<i className="ri-arrow-down-s-line"></i>}
            styles={{ rightSection: { pointerEvents: 'none' } }}
            label="Supplier"
            placeholder="Supplier"
            searchable
            data={supplier}
            value={payload.supplier}
            size="sm"
            nothingFound="Tidak ada data."
            onChange={(supplier) => setPayload({ ...payload, supplier })}
          />
        </ColGrid>
      </ScaleGrid>
      <ScaleGrid align="center">
        <ColGrid>
          {/* {data.length < 1 && (
            <h3 style={{ display: 'flex', justifyContent: 'center' }}>Tidak Ada Data.</h3>
          )} */}
          {data.length > 0 && <Rincian {...props} />}
        </ColGrid>
      </ScaleGrid>
    </ReportSectionContent>
  )
}

TbsLuarPlasmaUSBReport.propTypes = {
  data: PropTypes.array,
  payloads: PropTypes.object
}
