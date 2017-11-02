import React from 'react';
import {Router, Route, Switch} from 'dva/router';
// import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import Tester from "./routes/Tester2.js";

import IndexPage from './routes/HomePage'
import List from './components/AIList/List'
import Details from './components/details';
import { UserAccount } from './components/UserAccount/UserAccount'
import { HomeHeader } from './components/Header/HeaderLight' 



function RouterConfig({history}) {
    return (
        <Router history={history} >
            <Switch>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/list" exact component={List}/>
                <Route path="/details" exact component={Details}/>
                <Route path="/users" component={Users}/>
                <Route path="/test" component={HomeHeader} />
                <Route path="/userAccount" component={UserAccount}/>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
