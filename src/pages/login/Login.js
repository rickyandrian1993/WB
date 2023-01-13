import React, { useEffect, useState } from 'react'
import { Grid, Loader, PasswordInput, Text, TextInput } from '@mantine/core'
import { ButtonWB, ControlButton, WideLogo } from '../../components'
import { GlassCard, LoginPage } from './styledLogin'
import { LoginController, MillController, SyncController } from '../../services'
import { useForm } from '@mantine/form'
import { loginForm } from '../../constants'

const { Col } = Grid

export default function Login() {
  const form = useForm(loginForm)
  const { login } = LoginController()
  const { syncData } = SyncController()
  const { getMillUser } = MillController()
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
        <ButtonWB
          size="md"
          radius="md"
          title="Login"
          onClick={loginHandler}
          disabled={loadingLogin}
        >
          {loadingLogin ? <Loader color="#fff" variant="bars" size="sm" /> : 'LOGIN'}
        </ButtonWB>
        <div className="login__copyright">&copy;WIDE 2021 - V.1.0.1</div>
      </GlassCard>
    </LoginPage>
  )
}
