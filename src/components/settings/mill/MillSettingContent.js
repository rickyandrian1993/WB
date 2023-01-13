import React, { useState } from 'react'
import { Col, Grid, Loader, Select } from '@mantine/core'
import { useForm } from '@mantine/form'
import { ButtonWB } from '../../index'
import PropTypes from 'prop-types'
import { MillController } from '../../../services'

export default function MillSettingContent({ data }) {
  const { updateMillUser } = MillController()
  const [loading, setLoading] = useState(false)
  const form = useForm({
    initialValues: {
      mill: null
    },
    validate: (values) => {
      return {
        mill: values.mill === null ? 'Mill tidak boleh kosong.' : null
      }
    }
  })

  const millChangeHandler = (e) => {
    const mill = data.find((item) => item.value === e)
    form.setFieldValue('mill', mill.data)
  }

  const settingOptionSubmitHandle = () => {
    if (form.validate().hasErrors) return
    updateMillUser(form.values.mill, setLoading)
  }

  return (
    <Grid sx={{ '.mantine-Select-root': { position: 'relative' } }}>
      <Col>
        <Select
                rightSection={<i className="ri-arrow-down-s-line"></i>}
          withAsterisk
          label="Mill"
          placeholder="Mill"
          searchable
          data={data}
          size="md"
          radius="md"
          required
          nothingFound="Tidak ada data."
          onChange={millChangeHandler}
        />
      </Col>
      <Col>
        <ButtonWB size="md" onClick={settingOptionSubmitHandle} disabled={loading}>
          {loading ? <Loader color="#fff" variant="bars" size="sm" /> : 'SIMPAN'}
        </ButtonWB>
      </Col>
    </Grid>
  )
}

MillSettingContent.propTypes = {
  data: PropTypes.any
}
