import React from 'react'
import { Drawer, Grid, Group, Tabs } from '@mantine/core'
import { ControlBox } from './styledControlButton'
import { useEffect, useState } from 'react'
import {
  ButtonWB,
  FingerSettingContent,
  Loading,
  MillSettingContent,
  PopUpModal,
  PortSettingContent
} from '../index'
import PropTypes from 'prop-types'
import { MillController, SerialPortController } from '../../services'

const { Col } = Grid
const ModalContent = ({ setOpenModal }) => (
  <Grid>
    <Col>
      <Group spacing={8} position="right">
        <ButtonWB variant="outline" onClick={() => setOpenModal(false)}>
          Batal
        </ButtonWB>
        <ButtonWB variant="filled" color="red" onClick={() => window.close()}>
          Keluar
        </ButtonWB>
      </Group>
    </Col>
  </Grid>
)

const ControlButton = () => {
  const { getConnOpt } = SerialPortController()
  const { getMillList } = MillController()
  const [activeTab, setActiveTab] = useState('finger')
  const [millData, setMillData] = useState([])
  const [portData, setPortData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openDrawer, setOpenDrawer] = useState(true)

  useEffect(() => {
    if (openDrawer) {
      if (activeTab === 'port') {
        setLoading(true)
        setPortData([])
        getConnOpt(setLoading, setPortData)
      }
      if (activeTab === 'mill') {
        setLoading(true)
        getMillList(setLoading, setMillData)
      }
    }
  }, [openDrawer, activeTab, getConnOpt, getMillList])

  return (
    <ControlBox>
      <ButtonWB color="yellow" variant="outline" size="sm" onClick={() => setOpenDrawer(true)}>
        <i className="ri-settings-3-line" />
      </ButtonWB>
      <ButtonWB color="red" variant="outline" size="sm" onClick={() => setOpenModal(true)}>
        <i className="ri-shut-down-line" />
      </ButtonWB>

      <PopUpModal state={openModal} stateCb={setOpenModal} title="Apakah anda yakin ingin keluar?">
        <ModalContent setOpenModal={setOpenModal} />
      </PopUpModal>

      <Drawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title="Settings"
        padding="xl"
        size="md"
        position="right"
      >
        <Tabs defaultValue={activeTab} onTabChange={(e) => setActiveTab(e)}>
          <Tabs.List grow>
            <Tabs.Tab value="port">Port</Tabs.Tab>
            <Tabs.Tab value="mill">Mill</Tabs.Tab>
            <Tabs.Tab value="finger">
              Fingerprint
              {/* <i className="ri-fingerprint-2-line"></i> */}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="port" pt="xs">
            {loading && portData?.length === 0 ? (
              <Loading visible={loading} />
            ) : (
              <PortSettingContent drawerVisible={setOpenDrawer} data={portData} />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="mill" pt="xs">
            {loading && millData?.length === 0 ? (
              <Loading visible={loading} />
            ) : (
              <MillSettingContent data={millData} />
            )}
          </Tabs.Panel>

          <Tabs.Panel value="finger" pt="xs">
            <FingerSettingContent />
          </Tabs.Panel>
        </Tabs>
      </Drawer>
    </ControlBox>
  )
}

ModalContent.propTypes = {
  setOpenModal: PropTypes.func
}

export default ControlButton
