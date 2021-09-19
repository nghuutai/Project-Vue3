import axios from 'axios';
import {TOKEN} from './constant';
import dotenv from 'dotenv'
import dotenvExpand from'dotenv-expand';

const myEnv = dotenv.config()
dotenvExpand(myEnv);

export const instance = axios.create({
    baseURL: process.env.VUE_APP_URL_SERVER,
    timeout: 5000,
});

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(TOKEN)}`;
    return config;
  }, null, { synchronous: true }
);

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    localStorage.removeItem(TOKEN);
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);