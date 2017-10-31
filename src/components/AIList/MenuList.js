'use strict';
import React from 'react'
import { Menu, Icon } from 'antd'
import styles from './list.css'

const menuStyle = {
    background: '#0A1A23',
    height: '100%',
    borderRight: 0,
}

const subMenuStyle = {
    background: '#0A1A23',
}

const apiSubMenu = (opts) => {
    return opts.items.map((item, idx) => {
        const index = `key${idx + 1}`
        return (
            <Menu.Item style={subMenuStyle} key={index} >
                <Icon type="tag" className={styles.icon_style}/><span className={styles.tag_font} >{ item.title }</span>
            </Menu.Item>
        )
    })


}



export default class MenuList extends React.Component {
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
                defaultSelectedKeys={['key1']}
                >
                { apiSubMenu(apis) }
            </Menu>
        )
    }
}
