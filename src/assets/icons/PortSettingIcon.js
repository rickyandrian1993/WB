import React from 'react'
import Icon from '@ant-design/icons'

const PortSettingSvg = () => (
  <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.6667 32.0834V27.7084L7.29169 18.9584V10.2084H8.75002V5.83341C8.75002 5.03133 9.03585 4.34446 9.60752 3.77279C10.1782 3.2021 10.8646 2.91675 11.6667 2.91675H23.3334C24.1354 2.91675 24.8223 3.2021 25.394 3.77279C25.9647 4.34446 26.25 5.03133 26.25 5.83341V10.2084H27.7084V18.9584L23.3334 27.7084V32.0834H11.6667ZM11.6667 10.2084H14.5834V7.29175H16.0417V10.2084H18.9584V7.29175H20.4167V10.2084H23.3334V5.83341H11.6667V10.2084ZM14.5834 29.1667H20.4167V26.9792L24.7917 18.2292V13.1251H10.2084V18.2292L14.5834 26.9792V29.1667Z"
      fill="#FBDBAB"
    />
  </svg>
)

export const PortSettingIcon = (props) => <Icon component={PortSettingSvg} {...props} />