import React from 'react'
import PropTypes from 'prop-types'
import logo from '../../assets/images/Wide.png'
import { LogoStyled } from '../../assets/style/styled'

export default function WideLogo({ size }) {
  return (
    <LogoStyled>
      <img src={logo} alt="Wide Agri Logo" />
      <span>
        <strong>Weigh Bridge System</strong>
      </span>
    </LogoStyled>
  )
}

WideLogo.propTypes = {
  size: PropTypes.string
}
