import dva from 'dva';
import { browserHistory } from 'dva/router';
import createLoading from 'dva-loading';
import { message } from 'antd';
import {proxy} from './utils/global/index';
import './index.css';

const ERROR_MSG_DURATION = 3; // 3 秒

// 1. Initialize
const app = dva({
    history: browserHistory,
    onError(e) {
        message.error(e.message, ERROR_MSG_DURATION);
    }
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));
app.model(require("./models/users"));
app.model(require("./models/signup"));
app.model(require("./models/ai"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
