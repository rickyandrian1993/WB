import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AppShell } from '@mantine/core'
import {
  AllForm,
  Commodity,
  CpoPkoPage,
  History,
  NonCommodityPage,
  Print,
  Report,
  SyncPage,
  TbsIntiPage,
  TbsLuarPage,
  TbsPlasmaPage
} from '../pages'
import NavHeader from './layout/NavHeader'

const AppLayout = () => {
  return (
    <AppShell header={<NavHeader />}>
      <Routes>
        <Route path="/" element={<AllForm />} />
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
        <Route path="/commodity" element={<Commodity />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </AppShell>
  )
}

export default AppLayout
