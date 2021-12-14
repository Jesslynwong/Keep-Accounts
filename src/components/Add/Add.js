import React,{useEffect, useState,Fragment} from 'react';
import useStyles from './style'
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Navbar from '../NavBar/Navbar'
import {useDispatch,useSelector,} from 'react-redux'
import {addOne,updateOne} from '../../action/add'
import {useNavigate,useLocation} from 'react-router-dom'
import { DatePicker,MuiPickersUtilsProvider, } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib


const initalData = {classification:'', createdate:'',info:'',quant:'',type:''}


const classification = [
    {
        value:'clothes',
        label:'衣',
    },
    {
        value:'eat',
        label:'食',
    },
    {
        value:'living',
        label:'住',
    },
    {
        value:'transport',
        label:'行'
    }
]

function Add() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [formData, setformData] = useState(initalData)
    const [selectedDate, handleDateChange] = useState(new Date());
    const [success, setSuccess] = useState(true)
    const auth = useSelector((state) => state.auth)
    

    //判断button是否能点击
    useEffect(() => {
        let count = 0
        for(let item in formData) {
            if (formData[item] === ''){
                setSuccess(false)
            }else{
                count ++
            }
        }
        if (count === 5){
            setSuccess(true)
        }
    },[formData])

    //时间转换
    useEffect(() =>{
        let date = `${selectedDate.getFullYear()}-${selectedDate.getMonth()+1}-${selectedDate.getDate()}`
        setformData({...formData, 'createdate': date})
    },[selectedDate])
 
    //已经有数据的，直接填充即可
    let curId = {id:null}
    let itemId = location.state
    curId.id = itemId
    
    const post = useSelector((state) => curId.id? state.posts.find((p) => p._id === curId.id):null)
    
    useEffect(() => {
        if(post) {
            setformData(post.data)
        }
    },[post])

    //提交表单使用方法
    const handleSubmit = (e) =>{
        e.preventDefault()

        let params = {username:auth.register.username, data:formData}

        if (curId.id) {
            params['id'] = curId.id
        }

        //看看是否已经存在
        if (curId.id) {
            dispatch(updateOne(params,navigate))
        }else{
            dispatch(addOne(params,navigate))
        }
    }

    const handleChange = (e) => {
        setformData({...formData, [e.target.name]:e.target.value})
    }

    return(
        <>
           <div  style={{display:'flex', flexDirection:'column',height:'80%' , width:'100%' }}>
               <form onSubmit={handleSubmit}>
                <FormControl className={classes.formControl} style={{display:'flex',margin: 2,marginTop:30}} >
                        <Select 
                            name='type'
                            displayEmpty
                            className={classes.selectEmpty}
                            onChange={handleChange}
                        >
                            <InputLabel id="demo-simple-select-required-label">收支类型</InputLabel>
                            <MenuItem  value={'income'}>收入</MenuItem>
                            <MenuItem  value={'cost'}>支出</MenuItem>
                        </Select>
                    </FormControl>
                
                    <FormControl className={classes.formControl} style={{display:'flex',margin: 2,marginTop:30}} >
                        <TextField name='quant' label="数量" type='number' style={{width:'80%',alignSelf:'center'}} onChange={handleChange} value={formData.quant}/>
                    </FormControl>

                    <FormControl className={classes.formControl} style={{display:'flex',margin: 2,marginTop:30}}>
                        <TextField name='info' label="备注" style={{width:'80%', alignSelf:'center'}} onChange={handleChange} value={formData.info}/>
                    </FormControl>

                    <FormControl className={classes.formControl} style={{display:'flex',margin: 2,marginTop:30}}>
                        <Select
                            name='classification'
                            displayEmpty
                            className={classes.selectEmpty}
                            onChange={handleChange}
                            >
                                <InputLabel id="demo-simple-select-required-label">分类</InputLabel>
                            {classification.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                    </FormControl>
                        
                    <FormControl className={classes.formControl} style={{display:'flex',margin: 2,marginTop:40}} >   
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableFuture
                                openTo="year"
                                format="dd/MM/yyyy"
                                label="日期"
                                views={["year", "month", "date"]}
                                value={selectedDate}
                                onChange={handleDateChange}
                                style={{width:'80%', alignSelf:'center'}}
                            />
                            
                        </MuiPickersUtilsProvider>
                    </FormControl>

                    <FormControl className={classes.formControl} style={{display:'flex',margin: 2,marginTop:30}} >   
                        <Button variant="contained" color="default" type='submit' style={{width:'30%',  alignSelf:'center'}}  disabled = {success === true? false:true}  >完成啦！</Button> 
                    </FormControl>
               </form>
               
                  

           </div>
           <Navbar/>
            
            
        </>
    )
}

export default Add