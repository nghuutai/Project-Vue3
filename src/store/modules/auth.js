import {login} from '../../service/auth';
import {TOKEN} from '../../common/constant';
import {LOGIN} from '../type';

const state = {
    authenticate: true,
    error: ''
};

const getters = {};

const actions = {
    login: async (context, item) => {
        const result = await login(item);
        context.commit(LOGIN, result);
    }
};

const mutations = {
    [LOGIN]: (state, item) => {
        if (item.data.title === 'Success') {
            state.authenticate = true;
            localStorage.setItem(TOKEN, item.data.data.access_token);
        } else {
            state.error = item.data.message
        }
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}