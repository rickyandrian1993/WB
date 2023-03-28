import { dateFormat, trimPayload } from './utility'
import { defaultKeyInitialValue } from '../constants/basePayload'
import moment from 'moment'

const submiter = (values) => {
  const trimmedValue = trimPayload(values, defaultKeyInitialValue)

  const firstWeightPayload = () => {
    const payload = {
      data: {
        ...(values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
          ? trimmedValue
          : values),
        ...{
          do_date: values.do_date && dateFormat(values.do_date, 'Y-MM-DD'),
          spb_date: values.spb_date && dateFormat(values.spb_date, 'Y-MM-DD'),
          created_dt:
            values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
              ? moment.unix(values.created_dt / 1000).format('Y-MM-DD HH:mm:ss')
              : !values.created_dt
              ? moment().format('Y-MM-DD HH:mm:ss')
              : values.created_dt,
          ...(values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
            ? {
                nfc_received: 'Y',
                nfc_received_dt: moment().format('Y-MM-DD HH:mm:ss'),
                mt_comodity_cd: values.comodity_nm
              }
            : null)
        }
      },
      ...(!values?.child_data ? { evac_act_dtl: {} } : { evac_act_dtl: values?.child_data })
    }
    delete payload.data.driver_cd
    delete payload.data.loader_cd
    delete payload.data.estate_level_cd
    delete payload.data.child_data

    console.log('first submit', payload)
    return payload
  }
  const secondWeightPayload = () => {
    const payload = {
      ...(values.comodity_nm === 'TBS Inti' || values.comodity_nm === 'Brondolan'
        ? trimmedValue
        : values),
      cd: values.cd,
      customer_nm: values.customer_nm,
      do_date: values.do_date === null ? null : dateFormat(values.do_date, 'Y-MM-DD'),
      first_update: values.first_update || moment().format('Y-MM-DD HH:mm:ss'),
      mt_comodity_cd: values.comodity_nm,
      spb_date: values.spb_date === null ? null : dateFormat(values.spb_date, 'Y-MM-DD')
    }
    return payload
  }

  return { firstWeightPayload, secondWeightPayload }
}

export default submiter
