import { LoadingOverlay } from '@mantine/core'
import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { PrintWrapper } from '../../../assets/style/styled'
import { commodity } from '../../../constants/defaultConstant'
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
    if (!state) navigate('/history')
    else printFunc().then(() => navigate('/'))
  }, [state, navigate])

  const checkCommodity = (value) => {
    switch (value) {
      case 'CPO':
      case 'Kernel':
      case 'CPKO':
      case 'CPKE':
      case 'RBDPO':
      case 'OLEINS':
      case 'Stearin':
      case 'PFAD':
        return <PrintCommodityContent data={state?.data} />
      case 'Solar':
      case 'Solid':
      case 'Jangkos':
      case 'Cangkang':
      case 'Others':
        return <PrintNonCommodityContent data={state?.data} />
      case 'TBS Inti':
      case 'Brondolan':
        return <PrintTbsIntiContent data={state?.data} />
      case 'TBS Plasma':
        return <PrintTbsPlasmaContent data={state?.data} />
      case 'TBS Luar':
      case 'USB':
        return <PrintTbsLuarContent data={state?.data} />
      default:
        break
    }
  }

  return (
    <div style={{ position: 'relative', borderRadius: '16px' }}>
      {state && (
        <PrintWrapper id="print-section">
          {state?.type !== 'SPB' && <Header data={state?.data} />}
          {state?.type === 'SPB' && commodity.includes(state?.data?.mt_comodity_cd) && (
            <SPBContent data={state?.data} />
          )}
          {state?.type === 'TIKET' && checkCommodity(state?.data?.mt_comodity_cd)}
          <Footer data={state?.data} />
        </PrintWrapper>
      )}
      <LoadingOverlay
        visible={true}
        loaderProps={{ size: 'xl', color: '#628B48', variant: 'bars' }}
        overlayColor="#e1ffb1 !important"
        radius={16}
      />
    </div>
  )
}
