import { Button } from '@mantine/core'
import styled from 'styled-components'

const StyleButton = styled(Button)`
  margin: 0px 4px;
  border-width: 1.5px;
  border-radius: 12px;
  font-weight: 600;
  font-size:  16px;
  &[data-disabled] {
    background: #6ea4d3;
  }
`

export { StyleButton }
