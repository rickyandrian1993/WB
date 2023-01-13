import { LoadingOverlay } from '@mantine/core'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrintWrapper } from '../../../assets/style/styled'
import { commodity, nonCommodity } from '../../../constants/defaultConstant'
import { findPathByCd } from '../../../helpers/utility'
import Footer from './components/Footer'
import Header from './components/Header'
import PrintCommodityContent from './components/PrintCommodityContent.js'
import PrintTbsIntiContent from './components/PrintIntiContent'
import PrintNonCommodityContent from './components/PrintNonCommodityContent.js'
import PrintTbsPlasmaContent from './components/PrintPlasmaContent'
import PrintTbsLuarContent from './components/PrintTbsLuarContent'
import SPBContent from './components/SPBContent'

export default function Print() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const printFunc = async () => {
    return window.print()
  }

  useEffect(() => {
    if (!state) {
      navigate('/report')
    } else {
      printFunc().then(() => navigate(findPathByCd(state.data.mt_comodity_cd).path))
    }
  }, [state, navigate])
  return (
    <div>
      {state && (
        <PrintWrapper id="print-section" >
          {state?.type !== 'SPB' && <Header data={state?.data} />}
          {state?.type === 'SPB' && commodity.includes(state?.data?.mt_comodity_cd) && (
            <SPBContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && commodity.includes(state?.data?.mt_comodity_cd) && (
            <PrintCommodityContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && nonCommodity.includes(state?.data?.mt_comodity_cd) && (
            <PrintNonCommodityContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && state?.data?.mt_comodity_cd === 'TBS Inti' && (
            <PrintTbsIntiContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && state?.data?.mt_comodity_cd === 'TBS Luar' && (
            <PrintTbsLuarContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && state?.data?.mt_comodity_cd === 'TBS Plasma' && (
            <PrintTbsPlasmaContent data={state?.data} />
          )}
          <Footer data={state?.data} />
        </PrintWrapper>
      )}
      <LoadingOverlay
        visible={true}
        overlayBlur={2}
        loaderProps={{ size: 'xl', color: '#628B48', variant: 'bars' }}
        overlayOpacity={1}
        overlayColor="#e1ffb1 !important"
      />
    </div>
  )
}
