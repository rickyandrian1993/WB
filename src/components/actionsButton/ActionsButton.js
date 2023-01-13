import React, { useState } from 'react'
import { ActionsBox, ColGrid, ScaleGrid } from '../../assets/style/styled'
import ButtonWB from '../buttons/ButtonWB'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import { findPathByCd } from '../../helpers/utility'
import PopUpModal from '../popUpModal/PopUpModal'
import { Col, Grid, Loader } from '@mantine/core'
import { FingerPrintController } from '../../services'

const ModalContent = ({ setOpenModal, loading, verify }) => (
  <Grid justify="center" align="center">
    <Col span="content">
      <div style={{ position: 'relative', width: '100px', height: '100px' }}>
        <Loader sx={{ width: '100%', height: '100%' }} />
        <i
          className="ri-fingerprint-2-line"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 65
          }}
        ></i>
      </div>
    </Col>
  </Grid>
)
export default function ActionsButton({ data }) {
  const { netto_w, mt_comodity_cd } = data
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [isVerify] = useState(null)
  const { fingerAuth } = FingerPrintController()

  const navigateToPage = (cd) => {
    const url = findPathByCd(cd)
    navigate(url.path)
  }

  const handlePrint = (type, data) => {
    // setOpenModal(true)
    // fingerAuth(setLoading, (res) => {
    //   if (res.status === 200) navigate('/print', { state: { type: type, data: data } })
    // })
    navigate('/print', { state: { type: type, data: data } })
  }

  return (
    <ActionsBox>
      <PopUpModal state={openModal} stateCb={setOpenModal} title="Silahkan pindai sidik jari">
        <ModalContent setOpenModal={setOpenModal} loading={loading} verify={isVerify} />
      </PopUpModal>
      <ScaleGrid justify="start">
        <>
          {parseInt(netto_w) > 0 && (
            <>
              <ColGrid span={6}>
                <ButtonWB
                  size="md"
                  color="red"
                  variant="outline"
                  onClick={() => handlePrint('TIKET', data)}
                >
                  Print Tiket
                </ButtonWB>
              </ColGrid>
              {['CPO', 'PKO'].includes(mt_comodity_cd) && (
                <ColGrid span={6}>
                  <ButtonWB
                    size="md"
                    color="red"
                    variant="outline"
                    onClick={() => handlePrint('SPB', data)}
                  >
                    Print SPB
                  </ButtonWB>
                </ColGrid>
              )}
            </>
          )}
          {parseInt(netto_w) < 1 && (
            <ColGrid span={12}>
              <ButtonWB
                size="md"
                color="red"
                variant="outline"
                onClick={() => navigateToPage(mt_comodity_cd)}
              >
                Timbangan Kedua
              </ButtonWB>
            </ColGrid>
          )}
        </>
      </ScaleGrid>
    </ActionsBox>
  )
}

ActionsButton.propTypes = {
  data: PropTypes.object
}
