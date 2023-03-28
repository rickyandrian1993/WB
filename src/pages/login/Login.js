import React, { useEffect, useState } from 'react'
import { Grid, Loader, PasswordInput, Text, TextInput } from '@mantine/core'
import { ButtonWB, ControlButton, WideLogo } from '../../components'
import { GlassCard, LoginPage } from './styledLogin'
import { FingerPrintController, LoginController, MillController, SyncController } from '../../services'
import { useForm } from '@mantine/form'
import { loginForm } from '../../constants'
import { version } from '../../../package.json'

const { Col } = Grid

export default function Login() {
  const form = useForm(loginForm)
  const { login } = LoginController()
  const { syncData } = SyncController()
  const { getMillUser } = MillController()
  const { userBiometricIdentify } = FingerPrintController()
  const [loadingSync, setLoadingSync] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)
  const [millUser, setMillUser] = useState(null)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      window.localStorage.clear()
      getMillUser(setMillUser)
    }
    return () => (mounted = false)
  }, [getMillUser])

  const handleSync = () => {
    if (form.validate().hasErrors) return
    syncData(form.values, setLoadingSync, () => {})
  }

  const handleBmLogin = async () => {
    userBiometricIdentify(setLoadingLogin)
  }

  const loginHandler = async () => {
    if (form.validate().hasErrors) return
    login(form.values, setLoadingLogin)
  }

  return (
    <LoginPage>
      <GlassCard shadow="md">
        <ControlButton />
        <WideLogo size="sm" />
        <Text fz={'32px'} fw="500" ta="center">
          Weigh Bridge System
        </Text>
        <TextInput
          label="Username"
          placeholder="Username"
          rightSection={<i className="ri-user-3-line" />}
          radius="md"
          size="sm"
          required
          {...form.getInputProps('username')}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          radius="md"
          size="sm"
          required
          {...form.getInputProps('password')}
        />
        <Grid grow gutter={4} align="center" justify="center">
          <Col span={10}>
            <TextInput
              label="Mill"
              placeholder="Mill"
              rightSection={<i className="ri-community-fill" />}
              radius="md"
              size="sm"
              value={millUser ? millUser.nm : ''}
              disabled
            />
          </Col>
          <Col span={2}>
            <ButtonWB
              size="lg"
              radius="md"
              onClick={handleSync}
              disabled={loadingSync}
              sx={{
                padding: '0px 5px',
                width: '100%',
                height: '46px'
              }}
            >
              {loadingSync ? (
                <Loader color="#fff" variant="bars" size="sm" />
              ) : (
                <i className="ri-radar-line"></i>
              )}
            </ButtonWB>
          </Col>
        </Grid>
        <Grid grow gutter={4} align="center" justify="center">
          <Col span={10}>
            <ButtonWB
              size="md"
              radius="md"
              title="Login"
              onClick={loginHandler}
              disabled={loadingLogin}
              sx={{ width: '100%' }}
            >
              {loadingLogin ? <Loader color="#fff" variant="bars" size="sm" /> : 'LOGIN'}
            </ButtonWB>
          </Col>
          <Col span={2}>
            <ButtonWB
              size="lg"
              radius="md"
              onClick={handleBmLogin}
              disabled={loadingLogin}
              sx={{
                padding: '0px 5px',
                width: '100%',
                height: '46px'
              }}
            >
              {loadingLogin ? (
                <Loader color="#fff" variant="bars" size="sm" />
              ) : (
                <i className="ri-fingerprint-2-line" />
              )}
            </ButtonWB>
          </Col>
        </Grid>
        <div className="login__copyright">&copy;WIDE 2021 - V{version}</div>
      </GlassCard>
    </LoginPage>
  )
}
