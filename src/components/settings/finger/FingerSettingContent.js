import {
  Accordion,
  Button,
  Checkbox,
  Col,
  Grid,
  Loader,
  Modal,
  PasswordInput,
  Select,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import React, { useEffect, useState } from 'react'
import { FingerPrintController, LoginController } from '../../../services'
import { FingerTable, FormCreate } from '../../controlButton/styledControlButton'

export default function FingerSettingContent() {
  const form = useForm({
    initialValues: {
      nm: '',
      role_position: '',
      biometric_data: ''
    },
    validateInputOnChange: ['nm'],
    validate: ({ nm, role_position, biometric_data }) => {
      return {
        nm:
          nm.trim().length === 0
            ? 'Tidak boleh kosong'
            : nm.trim().length < 3
            ? 'Min 3 huruf'
            : null,
        role_position: role_position === '' || role_position === null ? 'Tidak Boleh Kosong' : null,
        biometric_data: biometric_data.length === 0 ? 'Tidak Boleh Kosong' : null
      }
    }
  })
  const [isValidated, setIsValidated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false)
  const [check, setCheck] = useState(false)
  const { validateFingerPassword, getCredentialList } = LoginController()
  const { fingerAuth, fingerInsert } = FingerPrintController()
  const [users, setUser] = useState([])

  const createCredential = (e) => {
    console.log('Create', e)
    fingerInsert(e, setLoading)
  }

  const handleScanFinger = () => {
    setModal(true)
    fingerAuth(setModal, (e) => {
      setCheck(true)
      form.setFieldValue('biometric_data', e)
    })
  }

  const handlePassword = (e) => {
    e.preventDefault()
    setLoading(true)
    // const { value } = e.target[0]
    const value = 'WeighBridgeAgriSystem'
    validateFingerPassword(value, setLoading, setIsValidated)
  }

  useEffect(() => {
    if (isValidated) {
      getCredentialList(setLoading, setUser)
    }
  }, [getCredentialList, isValidated, modal])

  return (
    <>
      <Modal opened={modal} onClose={() => setModal(false)} title="Silahkan pindai sidik jari">
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
      </Modal>
      {!loading && !isValidated ? (
        <form onSubmit={handlePassword}>
          <PasswordInput
            size="md"
            radius="md"
            name="Password"
            placeholder="Password"
            label="Input Password To Continue"
            withAsterisk
            visible={false}
            visibilityToggleIcon={() => false}
          />
        </form>
      ) : (
        <>
          <FingerTable verticalSpacing="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {users.map(({ nm, role_position }) => (
                <tr key={`${nm}-${role_position}`}>
                  <td>{nm}</td>
                  <td>{role_position}</td>
                </tr>
              ))}
            </tbody>
          </FingerTable>
          {users.length < 3 ? (
            <Accordion
              variant="separated"
              chevronPosition="left"
              chevron={<i className="ri-add-circle-line"></i>}
              radius="md"
              sx={{ marginTop: 4 }}
            >
              <Accordion.Item value="add" sx={{ background: '#ffffffbd', fontSize: 14 }}>
                <Accordion.Control sx={{ fontSize: 14 }}>Add New Credential</Accordion.Control>
                <Accordion.Panel>
                  <FormCreate onSubmit={form.onSubmit(createCredential)}>
                    <TextInput
                      label="Name"
                      placeholder="Name"
                      name="nm"
                      {...form.getInputProps('nm')}
                    />
                    <Select
                      label="Position"
                      placeholder="Position"
                      name="role_position"
                      sx={{ position: 'relative' }}
                      data={[{ value: 'Mill Manager', label: 'Mill Manager' }]}
                      {...form.getInputProps('role_position')}
                    />
                    <Checkbox
                      label="Finger Print Biometric"
                      description="Klik untuk scan fingerprint"
                      checked={check}
                      onChange={handleScanFinger}
                    />
                    <Button type="submit" variant="outline">
                      Create
                    </Button>
                  </FormCreate>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          ) : null}
        </>
      )}
    </>
  )
}
