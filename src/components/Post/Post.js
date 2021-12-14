import React from 'react';
import useStyles from './style'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditIcon from '@material-ui/icons/Edit';
import {useDispatch} from 'react-redux'
import {deletePost} from '../../action/deletePost'
import {useNavigate} from 'react-router-dom'


export default function Post({post}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const editItem = (id) => {
    navigate('/add',{state: id})  //拿到数据 -> 转送数据 -> form拿到数据自动fill
  }

  return (
        <Grid item >
            <Paper className={classes.paper} style={{boxShadow:'none'}}>
                <div className={classes.subContain}>
                    <h1 >{post.data.info}</h1>
                  
                    <h1 style={{color: post.data.type==='cost'?'rgba(255, 99, 132)':'rgba(75, 192, 192)'}}>{post.data.type==='cost'?'-':'+'}{post.data.quant}</h1>
                </div>
                <div >
                  {post.data.createdate}
                    <DeleteOutlineIcon style ={{display:'float' , float:'right',fontSize:20}} onClick={() =>dispatch(deletePost(post._id, post.username))} />
                    <EditIcon style ={{display:'float' , float:'right',marginRight:10,fontSize:20}} onClick ={() => editItem(post._id)}/>
                </div>
                
            </Paper>
        </Grid>

  
  );
}

