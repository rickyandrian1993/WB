import { Grid, Navbar } from '@mantine/core'
import styled from 'styled-components'

const NavGrid = styled(Grid)`
  background: #628b48;
  border-radius: 8px;
  margin: 4px -8px 10px;
  justify-content: space-around;
  padding: 4px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  .mantine {
    &-Grid-root {
      background: transparent;
      margin: 0;
      padding: 0;
      .mantine-Grid-col {
        padding: 0;
      }
    }
    &-Divider-root {
      margin: 0px 10px;
      border-color: #fafff5bb;
    }
  }
`
const NavCol = styled(Grid.Col)`
  border-radius: 8px;
  padding: 8px 14 px;
`

const SideBox = styled(Navbar)`
  height: 100vh;
  justify-content: space-between;
  gap: 40px;
  border-radius: 0px 15px 15px 0px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 16px;
  > div {
    margin: 16px 0;
    &:nth-child(2) {
      max-height: 75vh;
      overflow-y: hidden;
    }
  }
`

const SideSection = styled(Navbar.Section)`
  :nth-child(2) {
    flex-grow: 2;
  }
  :last-child {
    .mantine-NavLink-root {
      min-height: 32px;
      color: #ff0000;
      &:hover {
        outline: 1px solid #ff000097;
      }
    }
  }
  .mantine-NavLink-root {
    margin-bottom: 10px;
    border-radius: 8px;
    min-height: 48px;
  }
`

export { NavGrid, NavCol, SideBox, SideSection }
