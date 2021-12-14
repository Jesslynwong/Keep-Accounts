import * as api from '../api/index'
import {FETCH_ALL} from '../constants/actionType'
export const deletePost = (id,username) => async (dispatch) => {
    try {
        let idParams = {id:id, username:username}
        const res = await api.deletePosts(idParams)
        const action = {type:FETCH_ALL, payload: res.data.sendData}
        dispatch(action)
        
    } catch (error) {
        console.log(error);
    }
}