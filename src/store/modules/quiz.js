import {addQuiz, getQuizBySubject, getAllQuiz, getQuiz, updateQuiz, deleteQuiz} from '../../service/quiz';
import {SUCCESS, FAILED} from '../../common/constant';
import {
    ADD_QUIZ,
    GET_ALL_QUIZ,
    GET_QUIZ_BY_SUBJECT,
    NEXT_QUESTION,
    PRE_QUESTION,
    RESET_QUIZ,
    GET_QUIZ,
    UPDATE_QUIZ,
    DELETE_QUIZ
} from '../type';

const state = {
    data: [],
    dataItem: {},
    error: '',
    indexQuiz: 0,
    answers: []
};

const getters = {
    getQuizForExam: (state) => {
        const question = state.data[state.indexQuiz];
        const data = {
            id: question.id,
            question: question.question,
            answers: [
                question.correct_answer,
                ...Object.values(question.incorrect_answer),
            ]
        }
        return data;
    },
    getAll1Quiz: (state) => {
        return state.data.map(quiz => ({
                id: quiz.id,
                question: quiz.question,
                subject: quiz.subject.name
        }));
    }
};

const actions = {
    addQuiz: async (context, item) => {
        const result = await addQuiz(item);
        context.commit(ADD_QUIZ, result);
    },
    getQuizBySubject: async (context, item) => {
        const result = await getQuizBySubject(item.subjectId);
        context.commit(GET_QUIZ_BY_SUBJECT, result);
    },
    nextQuestion: (context, item) => {
        context.commit(NEXT_QUESTION, item);
    },
    preQuestion: (context, item) => {
        context.commit(PRE_QUESTION, item);
    },
    resetQuiz: (context) => {
        context.commit(RESET_QUIZ);
    },
    getAllQuiz: async (context, item) => {
        const result = await getAllQuiz(item);
        context.commit(GET_ALL_QUIZ, result);
    },
    getQuiz: async (context, quizId) => {
        const result = await getQuiz(quizId);
        context.commit(GET_QUIZ, result);
    },
    updateQuiz: async (context, item) => {
        const result = await updateQuiz(item.id, item.data);
        context.commit(UPDATE_QUIZ, result);
    },
    deleteQuiz: async (context, quizId) => {
        const result = await deleteQuiz(quizId);
        context.commit(DELETE_QUIZ, result);
    }
};

const mutations = {
    [ADD_QUIZ]: (state, payload) => {
        if (payload.data.title === SUCCESS) {
            state.data = payload.data.data;
        } else {
            state.error = payload.data.message;
        }
    },
    [GET_QUIZ_BY_SUBJECT]: (state, payload) => {
        if (payload.data.title === SUCCESS) {
            state.data = payload.data.data;
        } else {
            state.error = payload.data.message;
        }
    },
    [NEXT_QUESTION]: (state, payload) => {
        const existAnswer = state.answers.find(item => item.id === payload.id);
        if (existAnswer) {
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
        const existAnswer = state.answers.find(item => item.id === payload.id);
        if (existAnswer) {
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
        state.error = '';
        state.indexQuiz = 0;
        state.answers = [];
    },
    [GET_ALL_QUIZ]: (state, payload) => {
        if (payload.data.title === SUCCESS) {
            state.data = payload.data.data.items;
        } else {
            state.error = payload.data.message;
        }
    },
    [GET_QUIZ]: (state, payload) => {
        if (payload.data.title === SUCCESS) {
            state.dataItem = payload.data.data;
        } else {
            state.error = payload.data.message;
        }
    },
    [UPDATE_QUIZ]: (state, payload) => {
        if (payload.data.title === FAILED) {
            state.error = payload.data.message;
        }
    },
    [DELETE_QUIZ]: (state, payload) => {
        if (payload.data.title === FAILED) {
            state.error = payload.data.message;
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