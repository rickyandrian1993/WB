import { Box, Grid } from '@mantine/core'
import styled from 'styled-components'

const GlobalStyledComponent = styled.div`
  .mantine {
    &-AppShell-main {
      padding-top: 0px;
    }
    &-Burger-burger {
      &,
      &::after,
      &::before {
        background-color: #628b48;
      }
      &[data-opened] {
        background-color: transparent;
      }
    }
    &-InputWrapper {
      &-root {
        position: relative;
        &:has(input:placeholder-shown) {
          .mantine {
            &-InputWrapper-label {
              opacity: 0;
            }
            &-Input-input {
              padding-top: 0px;
              input {
                padding-top: 0px;
              }
            }
          }
        }
      }
      &-label {
        padding-left: 12px;
        font-size: 14px;
        top: 4px;
        position: absolute;
        opacity: 1;
        z-index: 1;
      }
    }
    &-Input {
      &-input {
        &:disabled {
          background: transparent;
        }
        font-size: 16px;
        min-height: 52px;
        padding-top: 16px;
        input {
          height: 48px;
          padding-top: 14px;
        }
      }
    }
    &-Divider-label {
      border-color: #628b48;
      color: #628b48;
      &::after,
      &::before {
        border-color: #628b48;
      }
    }
    &-NavLink-root {
      color: #628b48;
      &[data-active] {
        background-color: #e1ffb1;
      }
    }
  }
`

const ScaleGrid = styled(Grid)`
  .mantine {
    &-InputWrapper {
      &-root {
        &:has(input:placeholder-shown) {
          .mantine {
            &-Input-input {
              padding-top: 0px;
              input {
                padding-top: 0px;
              }
            }
          }
        }
      }
      &-label {
        padding-left: 0px;
        padding: 0px 4px;
        font-size: 14px;
        top: -8px;
        left: 6px;
        position: absolute;
        opacity: 1;
        z-index: 1;
        background: #fff;
        line-height: 10px;
      }
    }
    &-Input {
      &-input {
        border-color: #628b48;
        min-height: 38px;
        padding-top: 0px;
        input {
          height: 38px;
          padding-top: 0px;
        }
        &:focus,
        &:focus-within {
          border: 1px solid #7ce496;
        }
      }
      &-rightSection {
        border-left: 1px solid #628b48;
        font-size: 12px;
      }
    }
    &-Textarea-input {
      padding-top: 6px;
    }
    &-Divider-root {
      margin: 8px;
      width: 100%;
    }
    &-SegmentedControl {
      &-root {
        border-radius: 12px;
        background: transparent;
        border: 1.5px solid #628b48;
      }
      &-active {
        border-radius: 8px;
        background: #628b48;
      }
      &-controlActive {
        label {
          color: #fff;
          font-size: 16px;
        }
      }
    }
    &-Select {
      &-dropdown {
        border: 1px solid #628b48;
      }
      &-item {
        &[data-hovered] {
          background-color: #e1ffb1;
        }
        &[data-selected] {
          background-color: #628b48;
        }
      }
      &-rightSection {
        font-size: 22px;
        color: #628b48;
      }
    }
  }
  .scale-display {
    background-color: #fafff5bb;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='15' ry='15' stroke='%23628B48FF' stroke-width='3' stroke-dasharray='15%2c 10' stroke-dashoffset='33' stroke-linecap='butt'/%3e%3c/svg%3e");
    border-radius: 8px;
    text-align: center;
    padding: 8px;
    .mantine-Text-root:last-child {
      &::after {
        font-size: 16px;
        content: 'Kg';
        margin-left: 5px;
      }
    }
  }
  label:focus {
    outline: unset !important;
  }
`
const FormBox = styled.form`
  background-color: #fafff5bb;
  border: 0.5px solid #628b48;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 20px;

  svg {
    color: #628b48;
  }
`

const ColGrid = styled(Grid.Col)`
  &.button-header-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    border-radius: 8px;
    padding: 4px;

    button {
      height: 46px;
    }
  }
  .mantine-Col-root {
    margin-top: 0;
  }
  ${({ leftdivider }) => leftdivider && `border-left : 1px solid #628B48;`}
`

const FormGroup = styled(Box)`
  display: flex;
  border: solid 1px #628b48;
  border-radius: 4px;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;
  position: relative;
  &:focus,
  &:focus-within {
    border: 1px solid #7ce496;
  }
  .mantine {
    &-Input {
      &-input {
        min-height: 36px;
        border: none;
        background-color: transparent;
        &:focus,
        &:focus-within {
          border: none;
        }
      }
    }
    &-InputWrapper-root {
      width: 100%;
      &:first-child {
        position: initial;
      }
      &:last-child {
        border-left: 1px solid #628b48;
      }
    }
  }
`

const ReportHeader = styled(Box)`
  margin-top: 12px;
`

const ReportTableBox = styled(Box)`
  align-items: center;
  min-height: 30vh;
  background-color: #fafff5bb;
  border: 0.5px solid #628b48;
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  > div {
    border-radius: 12px;
    padding: 0px 2px;
    div,
    nav {
      background-color: transparent;
    }
    div {
      border: unset;
    }
  }
  nav {
    border-top: 1px solid #628b48;
  }
  .rdt {
    &_Table {
      padding: 12px;
      > div {
        border-radius: 8px;
      }
    }
    &_TableHead {
      background: #e1ffb1;
      border: 1px solid #628b48;
      * {
        border-radius: 12px;
        white-space: unset;
        overflow: visible;
        justify-content: space-between;
      }
      span {
        color: #628b48;
        fill: #628b48;
      }
    }
    &_TableBody {
      * {
        font-size: 12px;
      }
      > div {
        border: unset;
        &:hover {
          border-radius: 8px;
          background: unset;
          border: 1px solid #628b48;
        }
      }
    }
    &_ExpanderRow {
      background: #628b48;
      color: #e1ffb1;
      border-radius: 8px;
      padding: 0px 8px;
      &:hover {
        background-color: #628b48 !important;
        color: #e1ffb1;
      }
      .mantine-Grid-col {
        min-width: 11%;
        max-width: 12%;
        p {
          padding: 8px 0px;
          &:first-child {
            border-bottom: 1px solid #e1ffb1;
          }
        }
      }
    }
    &_Pagination {
      color: #628b48;
      button {
        color: #628b48;
        fill: #628b48;
        &:disabled {
          color: #e1ffb1;
          fill: #e1ffb1;
        }
      }
    }
    &_TableCell {
      > div {
        width: 100%;
        &:first-child {
          overflow: visible;
          white-space: normal;
        }
        > div {
          overflow: visible;
          white-space: normal;
        }
      }
    }
  }
`

const ActionsBox = styled(Box)`
  .mantine {
    &-Grid-col {
      width: 100%;
      padding: 2px;
      text-align: center;
    }
    &-Button-root {
      height: 28px;
      border-radius: 6px;
      padding: 0 6px;
    }
  }

  .tooltip {
    label {
      opacity: 0;
    }
    &:hover {
      label {
        opacity: 1;
      }
    }
  }
`

const PrintWrapper = styled(Box)`
  visibility: hidden;
  width: 9.5in;
  margin: auto;
  padding: 16px;
`

const PrintHeader = styled.div`
  border-bottom: 2px double #628b48;
`

const PrintContent = styled.div`
  h1 {
    border-bottom: 2px double #628b48;
  }
  .info {
    > div {
      &:not(:last-child) {
        border-right: 4px double #628b48;
      }
      > div {
        > div {
          padding: 6px;
          &:nth-child(1) {
            text-align: start;
          }
          &:nth-child(2) {
            text-align: end;
          }
        }
      }
    }
  }
  .grading-info {
    border-top: 2px double #628b48;
    border-bottom: 2px double #628b48;
    > div {
      text-align: center;
      > div {
        > div {
          padding: 6px;
          :first-child {
            text-align: left;
          }
          :last-child{
            text-align: right;
          }
        }
      }
    }
  }
  > div {
    margin: 0 26px;
    line-height: 1;
    &:nth-child(1) {
      margin-top: 4px;
    }
  }
`

const PrintFooter = styled.div`
  border-top: 2px double #628b48;
  > div {
    padding: 8px 0;
    line-height: 0;
    justify-content: center;
    text-align: center;
    &:nth-child(2) {
      padding-top: 40px;
    }
    &:last-child {
      padding-top: 4px;
    }
  }
`

export {
  ActionsBox,
  FormBox,
  FormGroup,
  GlobalStyledComponent,
  ScaleGrid,
  ColGrid,
  ReportTableBox,
  ReportHeader,
  PrintWrapper,
  PrintHeader,
  PrintContent,
  PrintFooter
}
