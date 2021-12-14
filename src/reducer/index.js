import {combineReducers} from 'redux'

import postReducer from './post'
import authReducer from './auth'

// console.log(authReducer);
export default combineReducers({posts:postReducer, auth:authReducer})
                                // posts和auth都是state,这里定义