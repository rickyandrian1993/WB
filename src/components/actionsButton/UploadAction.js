import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ButtonWB from '../buttons/ButtonWB'
import { ReportController } from '../../services'
import { getStore } from '../../helpers/utility'
import moment from 'moment'
import { LoadingOverlay } from '@mantine/core'

export default function UploadAction({ data }) {
  const { user } = getStore('accountInfo')
  const { mill, mill_detail } = getStore('mill')
  const { uploadData } = ReportController()
  const [loading, setLoading] = useState(true)

  const uploadHandler = (data) => {
    const estateList = []

    mill_detail.map((item) => estateList.push(item.pcc_estate_cd))

    const payload = {
      date: moment(data).format('Y-MM-DD'),
      userCd: user.cd,
      estate: estateList,
      millManager: mill.mill_manager
    }

    // uploadData(payload)
    console.log(payload)
  }

  return (
    <>
      <ButtonWB size="sm" color="red" variant="outline" onClick={() => uploadHandler(data.tanggal)}>
        Upload
      </ButtonWB>
    </>
  )
}

UploadAction.propTypes = {
  data: PropTypes.object
}
