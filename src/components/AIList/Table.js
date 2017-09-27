import { Table, Icon, Select, Button } from 'antd';
import React from 'react';
import '../font/font.css'
import styles from './table.css'
import mock_data from './mock_data/data'
import { Link } from 'dva/router';

let data = mock_data.tableData
export default class TableDemo extends React.Component {
    attribute = {
        bordered: true,
        loading: false,
        pagination: false,
        size: 'default',
        showHeader: false,
        scroll: undefined,
    };

    state = {
        data,
        filteredInfo: null,
        sortedInfo: null,

    };

    sortChange = (value) => {
        const val = `${value}`;
        if(val == 'Popular') {
            this.setState({
                sortedInfo: {
                    order: 'descend',
                    columnKey: 'followers',
                },
            })
        }
    }

    filterChange = (value) => {
        if(value === 'All') {
            this.setState({
                data: data.slice()
            })
            return;
        }
        const val = `^${value}$`;
        const reg = new RegExp(val, 'gi')
        this.setState({
            data: data.map((record) => {
                const match = record.price.match(reg)
                if (!match) return null;
                return {
                    ...record,
                };
            }).filter(record => !!record)
        });
    }

    collectIcon = (opt) => {
        console.log(opt)
        if(opt.isCollected === false) {
            const dataTemp = data.slice()
            this.setState({
                data: dataTemp.map((record) => {
                    if(record.key === opt.key) {
                        record.isCollected = true
                        record.iconStyle = 'icon_style2'
                        record.iconType = 'star'
                    }
                    return record
                })
            })
        }
        else {
            const dataTemp = data.slice()
            this.setState({
                data: dataTemp.map((record) => {
                    if(record.key === opt.key) {
                        record.isCollected = false
                        record.iconStyle = 'icon_style1'
                        record.iconType = 'star_o'
                    }
                    return record
                })
            })
        }

    }

    render() {

        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        const columns = [{
            title: '',
            dataIndex: 'img',
            key: 'img',
            render: (text, record) =>
              <span className={styles.image_layout}><a href="#" >{text}</a></span>
              ,
        }, {
            title: '',
            key: 'intro',
            // width: '42%',
            render: (text, record) => (

              <span>

                <Link to='/details'>
                  <a className={styles.ai_name}>{record.name}</a>&nbsp;<span className={styles.by_style}> by</span>&nbsp;
                </Link>
                  <a href="#" className={styles.author_style}>{record.author}</a><br />
                  <span>{record.intro}</span>
              </span>
            ),
        }, {
            title: '',
            render: (text, record) => (
                <span>
                    <span className={styles.cell_val}>{record.price}</span><br/>
                </span>
            ),
            key: 'price',
            width: '9%',
            filteredValue: filteredInfo.name || null,
        }, {
            title: '',
            key: 'developers',
            render: (text, record) => (
                <span>
                    <span className={styles.cell_val}>{record.developers}</span>
                    <span className={styles.cell_name}>developers</span>
                </span>
            ),



        }, {
            title: '',
            key: 'followers',
            render: (text, record) => (
                <span>
                    <span className={styles.cell_val}>{record.followers}</span>
                    <span className={styles.cell_name}>followers</span>
                </span>
            ),
            sorter: (a, b) => a.followers - b.followers,
            sortOrder: sortedInfo.columnKey === 'followers' && sortedInfo.order,

        }, {
            title: '',
            render: (text, record) => (
                <span>
                    <span className={styles.up_time}>{record.uptime}</span>
                    <span className={styles.cell_name}>uptime</span>
                </span>
            ),
            key: 'uptime',
        }, {
            title: '',
            key: 'action',
            render: (text, record) => (
                <span className={styles.center_style}>
                    <a onClick={this.collectIcon.bind(this, record)}><Icon className={record.isCollected === false ? styles.icon_style1 : styles.icon_style2} type={record.isCollected === false ? 'star-o' : 'star'}></Icon></a>
                </span>
            ),

        }];


        return (

            <div>

                <div id="selector" className={styles.selectors}>
                    <div>
                        Sort By:&nbsp;&nbsp;&nbsp;
                        <Select defaultValue="Relevant" className={styles.selector} onSelect={this.sortChange}>
                            <Select.Option value="Popular">Popular</Select.Option>
                            <Select.Option value="Relevant">Relevant</Select.Option>
                            <Select.Option value="Recent" >Recent</Select.Option>
                            <Select.Option value="My AIs">My AIs</Select.Option>
                        </Select>

                        Price Range:&nbsp;&nbsp;&nbsp;<Select defaultValue="All" className={styles.selector}  onSelect={this.filterChange}>
                        <Select.Option value="All">All</Select.Option>
                        <Select.Option value="Free">Free</Select.Option>
                        <Select.Option value="Freemium" >Freemium</Select.Option>
                        <Select.Option value="Paid">Paid</Select.Option>
                    </Select>
                    </div>
                </div>

                <div className={styles.table_style}>
                    <Table  {...this.attribute} columns={columns} dataSource={this.state.data} />
                </div>

            </div>
        );
    }

}
// ReactDOM.render(<TableDemo />, document.getElementById('root'));
