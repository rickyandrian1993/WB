import React from 'react'
import { NavLink} from 'react-router-dom'
import { ColGrid, ScaleGrid } from '../../assets/style/styled'
import { ButtonWB } from '../../components'

const AllForm = () => {
  return (
    <ScaleGrid align="center">
      <ColGrid span={3}>
        <NavLink to="/tbs-inti">
          <ButtonWB color="green" variant="outline" size="lg">
            TbsIntiPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/tbs-plasma">
          <ButtonWB color="green" variant="outline" size="lg">
            TbsPlasmaPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/tbs-luar">
          <ButtonWB color="green" variant="outline" size="lg">
            TbsLuarPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/cpo">
          <ButtonWB color="green" variant="outline" size="lg">
            CpoPkoPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/pko">
          <ButtonWB color="green" variant="outline" size="lg">
            CpoPkoPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/solar">
          <ButtonWB color="green" variant="outline" size="lg">
            NonCommodityPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/solid">
          <ButtonWB color="green" variant="outline" size="lg">
            NonCommodityPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/tankos">
          <ButtonWB color="green" variant="outline" size="lg">
            NonCommodityPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
      <ColGrid span={3}>
        <NavLink to="/others">
          <ButtonWB color="green" variant="outline" size="lg">
            NonCommodityPage
          </ButtonWB>
        </NavLink>
      </ColGrid>
    </ScaleGrid>
  )
}

export default AllForm
