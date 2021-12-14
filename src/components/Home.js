import React,{useEffect} from 'react'
import {Grid} from '@material-ui/core'
import Post from './Post/Post'
import Navbar from './NavBar/Navbar'
import {useSelector,useDispatch} from 'react-redux'
import { getPosts } from '../action/post';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useNavigate} from 'react-router-dom'


function Home() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const auth = useSelector((state) => state.auth)
    const parms = {username: auth.register.username}
    const posts = useSelector((state) => state.posts)
    
    useEffect(() => {
        dispatch(getPosts(parms))
    }, [parms.username])

    const logOut = () => {
        sessionStorage.removeItem('auth')
        sessionStorage.removeItem('posts')
        navigate('/')
    }
    
    

    return (
        <>
            <div style={{position:'fixed', right:10,top:5,backgroundColor:'rgba(255, 99, 132)', borderRadius:'50%'}} onClick={() => logOut()}>
                <ExitToAppIcon fontSize='large' style={{color:'white',padding:4}}/>
            </div>
            {!posts.length? (
                <div style={{paddingTop:20}}>
                    <h1 style={{color:'#ff80ab', textAlign:'center'}}>快记录你的第一条帐8</h1>
                </div>
            ):(
                    <div style={{paddingTop:20}}>
                         <Grid container  direction='column-reverse' alignItems='stretch' justifyContent='center' display='flex' style = {{paddingBottom:'67px'}}>
                            {
                                posts && posts.map((post) => {
                                    return ( 
                                        <Post key={post._id} post={post}/>
                                    )
                                })
                            }
                        </Grid > 
                        
                    </div>
               ) }
           
            <Navbar/>
        </>
    
            
            
    )
}

export default Home
