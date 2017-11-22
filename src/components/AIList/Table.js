'use strict';
import { Table, Icon, Select, Button } from 'antd';
import React from 'react';
import '../font/font.css'
import styles from './table.css'
import mock_data from './mock_data/data'
import { Link } from 'dva/router';
import { connect } from 'dva';

const tableDataBack = mock_data.tableData;

function TableDemo ({ dispatch, aiName, tableData }) {

  console.log("aiName:", aiName);
  // tableData = JSON.stringify(tableData)
  // console.log("tableDataBack: \n" + tableDataBack)
  // console.log("((((((tableData: \n" + tableData)
  const attribute = {
    bordered: true,
    loading: false,
    pagination: false,
    size: 'default',
    showHeader: false,
    scroll: undefined,
  };

  let state = {
    filteredInfo: null,
    sortedInfo: null,
  };

  function sortChange(value) {

    dispatch({
      type: 'aiList/getAiListFromDb',
      payload: ""
      });

    // console.log("value: " + value);
    // dispatch({
    //   type: 'aiList/setSortOrder',
    //   payload: value
    //   });
  }


  function filterChange(value) {
    dispatch({
      type: 'aiList/setFilterInfo',
      payload: value
    });
  }

  function collectIcon(opt) {
    console.log("collectIcon: ", opt)
    dispatch({
      type: 'aiList/setIsCollected',
      payload: opt.key
    });

  }

  function renderToDetails(name) {
     dispatch({
       type: 'ai/setAIName',
       payload: name
       });
    }



    let { sortedInfo, filteredInfo } = state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const columns = [{
      title: '',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) =>
        <Link to='/details' onClick={renderToDetails.bind(null,record.params)}>
        <span className={styles.image_layout}><span className={styles.image_style2}>{text}</span></span>
        </Link>
        ,
    }, {
      title: '',
      key: 'intro',
      // width: '42%',
      render: (text, record) => (

        <span>
        <Link to='/details' onClick={renderToDetails.bind(null,record.params)}>
          <a className={styles.ai_name}>{record.name}</a>&nbsp;<span className={styles.by_style}>  by  </span>&nbsp;
        </Link>
          <a href={record.url} className={styles.author_style}>{record.author}</a><br />
          <span className={styles.intro_style}>{record.intro}</span>
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
      // filteredValue: filteredInfo.name || null,
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
    //   sorter: (a, b) => a.followers - b.followers,
    //   sortOrder: sortedInfo.columnKey === 'followers' && sortedInfo.order,

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
          <a onClick={collectIcon.bind(null, record)}><Icon className={record.isCollected === false ? styles.icon_style1 : styles.icon_style2} type={record.isCollected === false ? 'star-o' : 'star'}></Icon></a>
        </span>
      ),

    }];

    return (

      <div>
        {/*aiName: {aiName}*/}
        <div id="selector" className={styles.selectors}>
          <div>

            Sort By:&nbsp;&nbsp;&nbsp;
            <Select defaultValue="Relevant" className={styles.selector} onSelect={sortChange}>
              <Select.Option value="Popular">Popular</Select.Option>
              <Select.Option value="Relevant">Relevant</Select.Option>
              <Select.Option value="Recent" >Recent</Select.Option>
              <Select.Option value="My AIs">My AIs</Select.Option>
            </Select>

            Price Range:&nbsp;&nbsp;&nbsp;<Select defaultValue="All" className={styles.selector}  onSelect={filterChange}>
            <Select.Option value="All">All</Select.Option>
            <Select.Option value="Free">Free</Select.Option>
            <Select.Option value="Freemium" >Freemium</Select.Option>
            <Select.Option value="Paid">Paid</Select.Option>
          </Select>
          </div>
        </div>

        <div className={styles.table_style}>
          <Table  {...attribute} columns={columns} dataSource={tableData} />
        </div>

      </div>
    )


}

function mapStateToProps(state) {
  const { aiName } = state.ai;
  const { tableData } = state.aiList;
  return {
  loading: state.loading.models.ai,
  aiName,
  tableData
  };
}


export default connect(mapStateToProps)(TableDemo);

// ReactDOM.render(<TableDemo />, document.getElementById('root'));
