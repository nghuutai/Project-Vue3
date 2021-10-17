import { stringify } from 'query-string';
import {instance} from '../common/request';

export async function addQuiz(data) {
    try {
        const result = await instance.post('/quiz', data);
        return result;
    } catch (err) {
        return err.response;
    }
}

export async function getAllQuiz(query) {
    try {
        const queryString = stringify(query);
        const result = await instance.get(`/quiz?${queryString}`);
        return result;
    } catch (err) {
        return err.response;
    }
}

export async function getQuizBySubject(subjectId) {
    try {
        const result = await instance.get(`/subject/${subjectId}/quiz`);
        return result
    } catch (err) {
        return err.response;
    }
}

export async function getQuiz(quizId) {
    try {
        const result = await instance.get(`/quiz/${quizId}`);
        return result;
    } catch (err) {
        return err.response;
    }
}

export async function updateQuiz(quizId, data) {
    try {
        const result = await instance.put(`/quiz/${quizId}`, data);
        return result;
    } catch (err) {
        return err.response;
    }
}

export async function deleteQuiz(quizId) {
    try {
        const result = await instance.delete(`/quiz/${quizId}`);
        return result;
    } catch(err) {
        return err.response;
    }
}