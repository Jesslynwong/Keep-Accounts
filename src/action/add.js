import * as api from '../api/index'
import {FETCH_ALL} from '../constants/actionType'
export const addOne = (params,navigate) => async(dispatch) => {
    try {
        const res = await api.postData(params)
        const action = {type:FETCH_ALL, payload:res.data.result} //check
        dispatch(action)
        
        navigate('/home')
        
    } catch (error) {
        console.log(error);
    }
}

export const updateOne = (params, navigate) => async(dispatch) => {
    try {
        const res = await api.updateOne(params)
        const action = {type:FETCH_ALL, payload:res.data.result}
        dispatch(action)

        navigate('/home')

    } catch (error) {
        console.log(error);
    }
}