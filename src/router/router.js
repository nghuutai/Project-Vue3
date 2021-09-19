import Login from '../page/Login';
import SignUp from '../page/Sign-up';
import NavBar from '../components/NavBar.vue';
import ExamQuestion from '../page/ExamQuestion'
import ExamCompleted from '../page/ExamCompleted';
import Quiz from '../page/Quiz';
import {TOKEN} from '../common/constant';

const ifNotAuthenticated = (to, from, next) => {
    if (!localStorage.getItem(TOKEN)) {
        next()
        return
    }
    next('/')
}
  
const ifAuthenticated = (to, from, next) => {
    if (localStorage.getItem(TOKEN)) {
        next()
        return
    }
    next('/login')
}

export const routes = [
    { 
        path: '/login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/sign-up',
        component: SignUp,
    },
    {
        path: '/',
        component: NavBar,
        beforeEnter: ifAuthenticated,
        redirect: () => {
            return 'exam-question'
        },
        children: [
            {
              path: 'exam-question',
              component: ExamQuestion,
            },
            {
              path: 'quiz',
              component: Quiz,
            },
            {
              path: 'exam-completed',
              component: ExamCompleted,
            }
        ],
    }
];

