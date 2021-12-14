import {Doughnut} from 'react-chartjs-2'
import {Chart, ArcElement} from 'chart.js'
import {useSelector} from 'react-redux'
Chart.register(ArcElement);

function getQuant(year,month,posts, type) {

  let result = new Array(4).fill(0)

  for (let item of posts) {
    let itemTime = item.data.createdate.split('-')
    
    if (itemTime[0] == year && itemTime[1] == month) {
      if (item.data.type === type) {
        if (item.data.classification === 'clothes') result[0] += Number(item.data.quant) 
        if (item.data.classification === 'eat') result[1] += Number(item.data.quant) 
        if (item.data.classification === 'living') result[2] += Number(item.data.quant) 
        if (item.data.classification === 'transport') result[3] += Number(item.data.quant) 
      }
    }
  }

  return result

}



function PieChart() {

  const posts = useSelector((state) => state.posts)
  let thisYear = new Date().getFullYear()
  let thisMonth = new Date().getMonth() + 1  
  const thisMonthCost = getQuant(thisYear, thisMonth,posts,'cost')
  // console.log('cost',thisMonthCost);
  const thisMonthIncome = getQuant(thisYear, thisMonth,posts,'income')
  // console.log('income', thisMonthIncome);
  


  return(
      <Doughnut
         data = {{
                  labels: [
                      '衣',
                      '食',
                      '住',
                      '行'
                    ],
                    datasets: [{
                      label: '本月支出',
                      data: thisMonthCost,
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgba(75, 192, 192)'
                      ],
                      hoverOffset: 4,
                    },
                    {
                      label: '本月收入',
                      data: thisMonthIncome,
                      backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgba(75, 192, 192)'
                      ],
                      hoverOffset: 4,
                    }]
                  
              }
              //两个{{}}才ok
          }> 
          
      </Doughnut>
         
      

  )
}

export default PieChart