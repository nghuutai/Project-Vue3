import {instance} from '../common/request';
import {stringify} from 'query-string';

export async function addQuiz(data) {
    try {
        const result = await instance.post('/quizs', data);
        return result;
    } catch (err) {
        return err.response;
    }
}

export async function getAllQuiz(data) {
    try {
        const query = stringify(data);
        const result = await instance.get(`/quizs?${query}`);
        return result
    } catch (err) {
        return err.response;
    }
}