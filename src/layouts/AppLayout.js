import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import Top from './layout/Top'
import Side from './layout/Side'
import {
  CpoPkoPage,
  NonCommodityPage,
  Print,
  Report,
  SyncPage,
  TbsIntiPage,
  TbsLuarPage,
  TbsPlasmaPage
} from '../pages'

const AppLayout = () => {
  return (
    <AppShell navbar={<Side />}>
      <Top />
      <Routes>
        <Route path="/tbs-inti" element={<TbsIntiPage />} />
        <Route path="/tbs-plasma" element={<TbsPlasmaPage />} />
        <Route path="/tbs-luar" element={<TbsLuarPage />} />
        <Route path="/cpo" element={<CpoPkoPage />} />
        <Route path="/pko" element={<CpoPkoPage />} />
        <Route path="/solar" element={<NonCommodityPage />} />
        <Route path="/solid" element={<NonCommodityPage />} />
        <Route path="/tankos" element={<NonCommodityPage />} />
        <Route path="/others" element={<NonCommodityPage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/sync" element={<SyncPage />} />
        <Route path="/print" element={<Print />} />
        {/* <Route path="/history" element={<HistoryPage />} />
        <Route path="/upload" element={<UploadPage />} />

        <Route path="/history/edit" element={<EditPage />} />
        <Route path="/history/print" element={<PrintPage />} />
        <Route path="/history/print-spb" element={<PrintSPBPage />} /> */}
      </Routes>
    </AppShell>
  )
}

export default AppLayout
