import {instance} from '../common/request';

export async function login(data) {
    try {
        const result = await instance.post('/login', data)
        return result;
    } catch (err) {
        return err.response;
    }
}

export async function createUser(data) {
    try {
        const result = await instance.post('/user', data);
        return result;
    } catch (err) {
        return err.response;
    }
}