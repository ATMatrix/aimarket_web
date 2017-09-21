import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';

import Users from "./routes/Users.js";

import Tester from "./routes/Tester.js";

function RouterConfig({history}) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage}/>
                <Route path="/users" component={Users}/>
                <Route path="/tester" component={Tester} />
            </Switch>
        </Router>
    );
}

export default RouterConfig;
