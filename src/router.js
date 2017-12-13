import React from 'react';
import {Router, Route, Switch} from 'dva/router';
// import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import { Tester } from "./routes/Chat";

import IndexPage from './routes/HomePage'
import List from './components/AIList/List'
import Details from './components/details';
import { UserAccount } from './components/UserAccount/UserAccount'
import { HomeHeader } from './components/Header/HeaderLight'
import VideoRoom  from './routes/VideoRoom'
import Billing  from './components/MicroRaiden/Billing'

function RouterConfig({history}) {
    return (
        <Router history={history} >
            <Switch>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/list" exact component={List}/>
                <Route path="/details/:id" exact component={Details}/>
                <Route path="/users" component={Users}/>
                <Route path="/test" component={Tester} />
                <Route path="/userAccount" component={UserAccount}/>
                <Route path="/room" component={VideoRoom}/>
                <Route path="/bill" component={Billing}/>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
