import * as api from '../api/index'
import {AUTH,AUTHERR} from '../constants/actionType'

export const signup = (resigter, navigate) => async(dispatch) =>{
    try {
        const {data} = await api.signUp(resigter) 

        if (data !== 'wrong') {
            dispatch({type:AUTH, payload:data})
            navigate('/home')
        } else {
            dispatch({type:AUTHERR, payload:data})
        }
    } catch (error) {
        console.log(error.message);
    }
}
