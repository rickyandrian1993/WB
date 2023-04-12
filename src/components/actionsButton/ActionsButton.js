import React, { useState } from 'react'
import { ActionsBox, ColGrid, ScaleGrid } from '../../assets/style/styled'
import ButtonWB from '../buttons/ButtonWB'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'
import PopUpModal from '../popUpModal/PopUpModal'
import { Col, Grid, Loader, Text } from '@mantine/core'
import { FingerPrintController } from '../../services'
import { commodityList } from '../../constants'

const ModalContent = ({ setOpenModal, verify }) => (
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
  const [openModal, setOpenModal] = useState(false)
  const [isVerify] = useState(null)
  const { fingerValidate } = FingerPrintController()

  const handlePrint = (type, data) => {
    setOpenModal(true)
    fingerValidate(setOpenModal, (res) => {
      if (res.status_code === 200) navigate('/print', { state: { type: type, data: data } })
      else setOpenModal(false)
    })
  }

  return (
    <ActionsBox>
      <PopUpModal state={openModal} stateCb={setOpenModal} title="Silahkan pindai sidik jari">
        <ModalContent setOpenModal={setOpenModal} verify={isVerify} />
      </PopUpModal>
      <ScaleGrid justify="start">
        <>
          {parseInt(netto_w) > 0 && (
            <>
              <ColGrid
                span={
                  commodityList
                    .filter((item) => item.group === 'Commodity')
                    .map((group) => group.value)
                    .includes(mt_comodity_cd)
                    ? 6
                    : 12
                }
              >
                <ButtonWB
                  size="md"
                  color="red"
                  variant="outline"
                  onClick={() => handlePrint('TIKET', data)}
                >
                  Print Tiket
                </ButtonWB>
              </ColGrid>
              {commodityList
                .filter((item) => item.group === 'Commodity')
                .map((group) => group.value)
                .includes(mt_comodity_cd) && (
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
              <Text fz="xl" fw={700}>
                Belum Timbang Kedua
              </Text>
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
