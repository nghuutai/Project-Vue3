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
        console.log('item', item)
        const result = await login(item);
        context.commit(LOGIN, result);
    }
};

const mutations = {
    [LOGIN]: (state, item) => {
        console.log('mutaion item', item);
        if (item.data.title === 'Success') {
            state.authenticate = true;
            localStorage.setItem(TOKEN, item.data.data.access_token);
        } else {
            console.log(item.data.message);
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