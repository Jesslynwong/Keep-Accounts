import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {signup} from '../action/auth'
import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const initalRegister = {password:'', username:''}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/Jesslynwong">
        WongKaYan Jesslyn website 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth() {
  const classes = useStyles();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [resigter, setRegister] = useState(initalRegister)
  const dispatch = useDispatch()
  const auth = useSelector((state) => state.auth)


  const handleSubmit = (e) => {
    e.preventDefault()
    //check 是否通过
    if (resigter.username !== '' && resigter.password !== '') {
      dispatch(signup(resigter,navigate))
    }
    
  }
  
  const changeState = (e) => {
    setRegister({...resigter, [e.target.name]:e.target.value})
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          登录
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="username"
            name="username"
            autoFocus
            onChange = {changeState}

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            // type="text"
            type={showPassword? "text": "password"} 
            autoComplete="current-password"
            onChange = {changeState}
          />
          <div>
          <FormControlLabel
            control={<Checkbox  onChange={handleClickShowPassword} name="checkedA" />}
            label="显示密码"
          />
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Typography component="h5" variant="h6" style={{textAlign:'center'}}>
            自动注册
        </Typography>
        <Copyright />
        {
          auth === 'wrong' ? (
            <Typography component="h5" variant="h6" style={{textAlign:'center' ,color:'red'}}>
              用户名已经存在或者密码错误
             </Typography>
          ): <div></div>
        }
        
      </Box>
    </Container>
  );
}