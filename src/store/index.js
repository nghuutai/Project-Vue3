import {createStore, createLogger} from 'vuex';
import auth from './modules/auth';
import subject from './modules/subject';
import quiz from './modules/quiz';

const debug = true;

export default createStore({
    modules: {auth, subject, quiz},
    strict: debug,
    plugins: debug ? [createLogger()] : []
});