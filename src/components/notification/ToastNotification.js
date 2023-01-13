import { showNotification } from '@mantine/notifications'
import PropTypes from 'prop-types'

export default function ToastNotification({ title, message, isError }) {
  return showNotification({
    title: title,
    message: message,
    color: isError ? 'red' : 'green'
  })
}

ToastNotification.propTypes = {
  message: PropTypes.string,
  title: PropTypes.string,
  isError: PropTypes.bool
}
