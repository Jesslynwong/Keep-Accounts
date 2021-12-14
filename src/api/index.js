import axios from 'axios'

const API = axios.create({baseURL:'https://qczvln.api.cloudendpoint.cn'})

export const fetchPosts =  (parms) => API.get('/getItem',{params:parms})
export const postData = (params) => API.post('/postData',params)
export const signUp = (resigter) => API.post('/signin',resigter)
export const deletePosts = (idParams) => API.get('/deleteposts',{params:idParams})
export const updateOne = (params) => API.post('/updateone',params)