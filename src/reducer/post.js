import {FETCH_ALL} from '../constants/actionType'

let defaultPost = sessionStorage.getItem('posts')? JSON.parse(sessionStorage.getItem('posts')):[]

export default function postReducer(posts=defaultPost, action){
    switch(action.type) {
        case FETCH_ALL:

            //防止页面刷新
            if (action.payload !== 0) {
                sessionStorage.setItem('posts', JSON.stringify(action.payload))
            }

            return action.payload
        default:
            return posts

    }
}