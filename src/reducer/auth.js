import {AUTH,AUTHERR} from '../constants/actionType'

//防止跳转
let defaultAuth = sessionStorage.getItem('auth')?JSON.parse(sessionStorage.getItem('auth')):null

export default function authReducer(state = {register:defaultAuth}, action) {

    switch (action.type) {
        case AUTH:
            if (state !== null) {
                sessionStorage.setItem('auth', JSON.stringify(action?.payload) )
            }    
            return {...state, register:action?.payload}
        case AUTHERR:
            return 'wrong'
        default:
            return state
    }
}