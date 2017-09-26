import React from 'react'
// import ReactDOM from 'react-dom'
import './index.css'

import { Layout, Icon } from 'antd'

import Menu from './components/menu'
import HorizotalMenu from './components/horizontalMenu'
import Header from './components/header'
import ContentRow from './components/contentRow'

import data from './mock_data'

const {
  Sider,
  Content,
} = Layout

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data
  }

  render() {
    return (
      <div className="profile_container" >
        <div className="profile">
          <div>
            <div className="ai_logo">
              <img src={this.state.logoSrc} />
            </div>
            <div className="head_data">
              <div className="title_container">
                <h1>{this.state.title}</h1>
                <span><Icon type="star-o" /></span>
              </div>
              <div className="meta_data">
                <div>
                  <span><Icon type="user" /></span>
                  <a href="#">{this.state.creator}</a>
                </div>
                <div>
                  <span><Icon type="global" /></span>
                  <a href="#">{this.state.host}</a>
                </div>
                <div>
                  <span><Icon type="tag" /></span>
                  <a href="#">{this.state.tag}</a>
                </div>
                <div>
                  <span><Icon type="clock-circle-o" /></span>
                  <a href="#">{this.state.createAt}</a>
                </div>
              </div>
            </div>
          </div>
          <p className="description">{this.state.describe}</p>
        </div>
      </div>
    )
  }
}

export default class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.data
  }

  render() {
    return (
      <Layout>
        <Header />
        <Profile data={this.state.profile} />
        <HorizotalMenu />
        <Layout>
          <Sider width={200}>
            <Menu apis={this.state.apis} />
          </Sider>
          <Content>
            <ContentRow
              request={this.state.request}
              response={this.state.response}
            />
            <ContentRow
              request={this.state.request}
              response={this.state.response}
            />
            <ContentRow
              request={this.state.request}
              response={this.state.response}
            />
          </Content>
        </Layout>
      </Layout>
    )
  }
}

// ReactDOM.render(<Details data={data} />, document.getElementById('root'))
