import {addQuiz, getAllQuiz} from '../../service/quiz';
import {SUCCESS} from '../../common/constant';
import {ADD_QUIZ, GET_ALL_QUIZ, NEXT_QUESTION, PRE_QUESTION, RESET_QUIZ} from '../type';

const state = {
    data: [],
    error: '',
    indexQuiz: 0,
    answers: []
};

const getters = {
    getQuiz: (state) => {
        const question = state.data[state.indexQuiz];
        const data = {
            id: question.id,
            question: question.question,
            answers: [
                question.correct_answer,
                ...Object.values(question.incorrect_answer),
            ]
        }
        console.log(data);
        return data;
    }
};

const actions = {
    addQuiz: async (context, item) => {
        const result = await addQuiz(item);
        context.commit(ADD_QUIZ, result);
    },
    getAllQuiz: async (context, item) => {
        const result = await getAllQuiz(item);
        context.commit(GET_ALL_QUIZ, result);
    },
    nextQuestion: (context, item) => {
        context.commit(NEXT_QUESTION, item);
    },
    preQuestion: (context, item) => {
        context.commit(PRE_QUESTION, item);
    },
    resetQuiz: (context) => {
        context.commit(RESET_QUIZ);
    }
};

const mutations = {
    [ADD_QUIZ]: (state, payload) => {
        if (payload.data.title === SUCCESS) {
            console.log('_--------------DATA------------', payload.data);
            state.data = payload.data.data;
        } else {
            state.error = payload.data.message;
        }
    },
    [GET_ALL_QUIZ]: (state, payload) => {
        if (payload.data.title === SUCCESS) {
            console.log(payload.data.data);
            state.data = payload.data.data;
        } else {
            state.error = payload.data.message;
        }
    },
    [NEXT_QUESTION]: (state, payload) => {
        const existAnswer = state.answers.find(item => item.id === payload.id);
        if (existAnswer) {
            console.log('-------------voo');
            state.answers = state.answers.map(item => {
                if (item.id === existAnswer.id) {item.answer = payload.answer;} 
                return item;
            })
        } else {
            state.answers.push(payload);
        }
        state.indexQuiz = state.indexQuiz + 1;
    },
    [PRE_QUESTION]: (state, payload) => {
        console.log(payload);
        const existAnswer = state.answers.find(item => item.id === payload.id);
        if (existAnswer) {
            console.log('-------____VO');
            state.answers = state.answers.map(item => {
                if (item.id === existAnswer.id) {item.answer = payload.answer}
                return item;
            })
        } else {
            state.answers.push(payload);
        }
        state.indexQuiz = state.indexQuiz - 1;
    },
    [RESET_QUIZ]: (state) => {
        state.data = [];
        state.indexQuiz = 0;
        state.answers = [];
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}