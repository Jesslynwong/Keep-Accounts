import React from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
        
        appBar: { //固定底下
          top: 'auto',
          bottom: 0,
          
        },
      
        fabButton: { 
          position: 'absolute',
          zIndex: 1,
          top: -30, 
          left: 0,
          right: 0,
          margin: '0 auto', //居中
        },
        navItem:{
            display:'block',
            float: 'left',
            width: '50%' ,
            textAlign: 'center',
            textDecoration:'none' //去掉下划线
        }
      }));



export default function Navbar() {
    const classes = useStyles();
    
    return (
      <div>
        <AppBar color="primary"  className={classes.appBar}>
          {/* 子元素 */}
            <Toolbar>
            <Link to='/home' className={classes.navItem}><h2>details</h2></Link>
             <Link to='/add' style={{textDecoration:'none'}}>
              <Fab color="secondary" aria-label="add" className={classes.fabButton} >
                  <AddIcon />
              </Fab>
             </Link>
            
            <Link to='/analysis'className={classes.navItem}><h2>analysis</h2></Link>
            </Toolbar>
        </AppBar>
      </div>
  
    );
}