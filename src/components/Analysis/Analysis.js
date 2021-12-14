import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearChart from './linear'
import PieChart from './pie'
import Navbar from '../NavBar/Navbar'
import {useSelector} from 'react-redux'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 18,
  },
  pos: {
    marginBottom: 12,
  },
  graphSite:{
    marginTop:5,
    paddingTop:5
    
  }
});


export default function Analysis() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts)

  //计算当前月份收支出额度
  const date = new Date()
  let thisMouth = date.getMonth() + 1
  let thisYear = date.getFullYear()
  
  let monthTotalIncome = 0
  let monthTotalCost = 0
  
  for(let item of posts) {
    let itemDate = item.data.createdate
    itemDate = itemDate.split('-')
    if (thisYear == itemDate[0] && thisMouth == itemDate[1]) {
      if (item.data.type === 'cost') {
        monthTotalCost += Number(item.data.quant) 
      }
      if(item.data.type === 'income') {
        monthTotalIncome += Number(item.data.quant)
      }
    }

  }


  return (
    <div overflow="hidden">
      
      <Card className={classes.root} style={{boxShadow:'none'}}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            本月支出
          </Typography>
          <Typography variant="h4" component="h2">
            {Number(monthTotalCost)}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            本月收入
          </Typography>
          <Typography variant="h4" component="h2">
            {Number(monthTotalIncome)}
          </Typography>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            本月净收入
          </Typography>
          <Typography variant="h4" component="h2">
            {Number(monthTotalIncome - monthTotalCost)}
          </Typography>
          
        </CardContent>
      </Card>
      <Card className={classes.graphSite} style ={{paddingBottom:30,boxShadow:'none'}}>
        <LinearChart/>
      </Card>
      <Card className={classes.graphSite} style = {{paddingBottom:100,boxShadow:'none'}}>
        <PieChart/>
      </Card>
      <Navbar/>
      
    </div>



  );
}