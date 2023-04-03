import { Loader } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { ReportTableBox } from '../../../assets/style/styled'
import { RekapitulasiController } from '../../../services'

const columns = [
  { name: 'Supplier', selector: (row) => row.supplier ?? '-', grow: 2 },
  { name: 'Quantity', selector: (row) => row.total_kendaraan ?? '-' },
  { name: 'Total Weight', selector: (row) => `${row.total_berat} Kg` ?? '-', grow: 2 }
]

export default function RekapTable() {
  const { rekapTable } = RekapitulasiController()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) {
      rekapTable(setLoading, setData)
    }
  }, [loading, rekapTable])
  return (
    <ReportTableBox>
      <DataTable
        columns={columns}
        data={data}
        direction="auto"
        fixedHeader
        fixedHeaderScrollHeight="100%"
        highlightOnHover
        persistTableHead
        progressPending={loading}
        progressComponent={<Loader color="#628B48" variant="bars" size="xl" mt={34} />}
        defaultSortFieldId
        pointerOnHover
        responsive
        subHeaderAlign="left"
        subHeaderWrap
      />
    </ReportTableBox>
  )
}
