import React from 'react'
import { Menu, Icon } from 'antd'

const { SubMenu, Item } = Menu

class HorizotalMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Menu
        selectedKey="documents"
        mode="horizontal"
      >
        <Item key="documents">Documents</Item>
        <Item key="prizes">Prizes</Item>
      </Menu>
    )
  }
}

export default HorizotalMenu
