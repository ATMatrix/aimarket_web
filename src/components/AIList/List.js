'use strict';
import React from 'react';
import styles from './list.css'
import { connect } from 'dva';
import { Layout } from 'antd';
import { HomeHeader } from '../Header/HeaderLight'
import MenuList from './MenuList'
import Table from './Table'
import data from './mock_data/data'

const {
    Sider,
    Content,
    Header
} = Layout



function List ({params}) {

        return (
            <Layout className={styles.layout_size}>
                <Header className={styles.header_style} >
                    <HomeHeader />
                </Header>
                <Layout >
                    <Sider style={{ background: '#0A1A23' }}><br/><br/>
                        <p className={styles.font_style}>CATEGORIES</p>
                        <MenuList apis={data.categories} />
                    </Sider>
                    <Content style={{ background: '#FFFFFF' }}>
                        <Table/>
                    </Content>
                </Layout>
            </Layout>
        );
}
export default connect()(List);

// ReactDOM.render(<List />, document.getElementById('root'));

