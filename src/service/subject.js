import {instance} from '../common/request';

export async function getSubjects() {
    try {
        const result = await instance.get('/subjects')
        return result;
    } catch (err) {
        return err.response;
    }
}
