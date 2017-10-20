import React from 'react'
// import ReactDOM from 'react-dom'
import style from './index.css'

import { Layout, Icon } from 'antd'

import Menu from './components/menu'
import HorizotalMenu from './components/horizontalMenu'
import Header from '../Header/HeaderLight'
import ContentRow from './components/contentRow'

import { connect } from 'dva';


const {
  Sider,
  Content,
} = Layout

class Profile extends React.Component {
  constructor(props) {
    super(props)
    // this.props = props
    console.log("propsData")
    console.log(props)
    // params
  }

  render() {
    return (
      <div className={style.profile_container} >
        <div className={style.profile}>
          <div>
            <div className={style.ai_logo}>
              <img alt={this.props.title} src={this.props.logoSrc} />
            </div>
            <div className={style.head_data}>
              <div className={style.title_container}>
                <h1>{this.props.title}</h1>
                <span><Icon type="star-o" /></span>
              </div>
              <div className={style.meta_data}>
                <div>
                  <span><Icon type="user" /></span>
                  <a href="www.google.com">{this.props.creator}</a>
                </div>
                <div>
                  <span><Icon type="global" /></span>
                  <a href="www.google.com">{this.props.host}</a>
                </div>
                <div>
                  <span><Icon type="tag" /></span>
                  <a href="www.google.com">{this.props.tag}</a>
                </div>
                <div>
                  <span><Icon type="clock-circle-o" /></span>
                  <a href="www.google.com">{this.props.createAt}</a>
                </div>
              </div>
            </div>
          </div>
          <p className={style.description}>{this.props.describe}</p>
        </div>
      </div>
    )
  }
}

class Details extends React.Component {
  constructor(props) {
    super(props)
    // this.props = props
    console.log("props: ")
    console.log(props)
  }

  render() {
    return (
      <Layout>
        <Header />
        <Profile data={this.props.profile} />
        <HorizotalMenu />
        {/*<Layout>*/}
          {/*<Sider width={200}>*/}
            {/*<Menu apis={this.props.apis} />*/}
          {/*</Sider>*/}
          {/*<Content>*/}
            {/*<ContentRow*/}
              {/*request={this.props.request}*/}
              {/*response={this.props.response}*/}
            {/*/>*/}
            {/*<ContentRow*/}
              {/*request={this.props.request}*/}
              {/*response={this.props.response}*/}
            {/*/>*/}
            {/*<ContentRow*/}
              {/*request={this.props.request}*/}
              {/*response={this.props.response}*/}
            {/*/>*/}
          {/*</Content>*/}
        {/*</Layout>*/}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.ai.aiName
})

export default connect(mapStateToProps)(Details)
