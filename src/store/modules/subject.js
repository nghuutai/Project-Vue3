import {getSubjects} from '../../service/subject';
import {GET_SUBJECTS} from '../type';

const state = {
    data: [],
    error: ''
};

const getters = {};

const actions = {
    getSubjects: async (context) => {
        const result = await getSubjects();
        context.commit(GET_SUBJECTS, result);
    }
};

const mutations = {
    [GET_SUBJECTS]: (state, item) => {
        if (item.data.title === 'Success') {
            state.data = item.data.data;
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