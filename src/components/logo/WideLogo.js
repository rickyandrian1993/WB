import React from 'react'
import { Image } from '@mantine/core'
import PropTypes from 'prop-types'
import logo from '../../assets/images/Wide.png'

export default function WideLogo({ size, justify = 'center' }) {
  return (
    <div style={{ display: 'flex', justifyContent: justify, height: '100%' }}>
      <Image
        width={
          size === 'xl'
            ? 400
            : size === 'lg'
            ? 300
            : size === 'md'
            ? 200
            : size === 'sm'
            ? 150
            : size === 'unset'
            ? 'unset'
            : parseInt(size)
        }
        height={'100%'}
        src={logo}
        placeholder
      />
    </div>
  )
}

WideLogo.propTypes = {
  size: PropTypes.string,
  justify: PropTypes.oneOf(['start', 'center', 'end'])
}
