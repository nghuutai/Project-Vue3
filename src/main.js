import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index';
import { createRouter, createWebHashHistory } from 'vue-router';
import {routes} from './router/router';

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
});



const app = createApp(App);

app.use(store);
app.use(router);


app.mount('#app')

