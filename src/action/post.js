import * as api from '../api/index'
import {FETCH_ALL} from '../constants/actionType'

export const getPosts = (parms) => async (dispatch) => {
    try {
        const res = await api.fetchPosts(parms)
        const action = {type:FETCH_ALL, payload: res.data.result}
        dispatch(action)
    } catch (error) {
        console.log(error);
    }
}
