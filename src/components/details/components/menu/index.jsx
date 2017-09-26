import React from 'react'
import { Menu, Icon } from 'antd'

const { SubMenu, Item } = Menu

const menuStyle = {
  background: '#0A1A23',
  height: '100%',
  borderRight: 0,
  color: 'white',
}

const subMenuStyle = {
  background: '#0A1A23',
  color: 'white',
}

const itemStyle = {
  background: '#0A1A23',
  color: 'white',
}

const getMethodSpanStyle = (method) => {
  const upperMethod = method.toUpperCase()

  const basicStyle = {
    width: '50px',
    display: 'inline-block',
  }

  let color = ''
  switch (upperMethod) {
    case 'GET':
      color = 'green'
      break
    case 'POST':
      color = 'blue'
      break
    case 'DELETE':
      color = 'red'
      break
    case 'PUT':
      color = 'white'
      break
  }

  return Object.assign({ color }, basicStyle)
}

const apiSubMenu = (opts) => {
  const items = opts.items.map((item, idx) => {
    const key = `api${idx + 1}`
    return (
      <Item style={itemStyle} key={key}>
        <span style={getMethodSpanStyle(item.method)}>
          { item.method.toUpperCase() }
        </span>
        { item.title }
      </Item>
    )
  })

  return (
    <SubMenu
      style={subMenuStyle}
      key="apiSubMenu"
      title={
        <span><Icon type="user" />APIs</span>
      }>
      { items }
    </SubMenu>
  )
}

export default class extends React.Component {
  constructor(props) {
    super()
    this.state = props
  }

  render() {
    const { apis } = this.state

    return (
      <Menu
        style={menuStyle}
        mode="inline"
        defaultSelectedKeys={['api1']}
        defaultOpenKeys={['apiSubMenu']}>
        { apiSubMenu(apis) }
      </Menu>
    )
  }
}
