import {Line} from 'react-chartjs-2'
import {useSelector} from 'react-redux'

import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,} from 'chart.js'
  
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend)

// 时间序列数组
function timeSeries(thisYear,thisMonth) { 
    let result = []

    let start = new Date(`${thisYear}-${thisMonth}-1`).setHours(0,0,0,0)
    let end = new Date(`${thisMonth+1 === 13?thisYear+1:thisYear}-${thisMonth+1 === 13?1:thisMonth}-1`).setHours(0,0,0,0)
    let thisMonthDay = (end - start)/(24 * 60 * 60 * 1000)
    
    for (let i=1; i <= thisMonthDay; i++) {
        result.push(`${thisYear}/${thisMonth}/${i}`)        
    }
    return result 
}

//收支序列
function moneySeries(monthlen,posts,thisYear,thisMonth,type) {  

    let result = new Array(monthlen).fill(0)

    for (let item of posts) {
        if (item.data.type === type && item.data.createdate.split('-')[0] == thisYear && item.data.createdate.split('-')[1] == thisMonth ) {
            let day = Number(item.data.createdate.split('-')[2])
            result[day-1] = Number(item.data.quant)
        }
    }
    return result
}

function LinearChart() {

    const posts = useSelector((state) => state.posts)
    // console.log(posts);

    let date = new Date()
    let thisMonth = date.getMonth() //未修正
    let thisYear = date.getFullYear()
    let timeArr = timeSeries(thisYear, thisMonth+1)
    let monthlen = timeArr.length
    let incomeArr = moneySeries(monthlen,posts,thisYear,thisMonth+1,'income')
    let costArr = moneySeries(monthlen,posts,thisYear,thisMonth+1,'cost')

    return (
        <Line
            data = {{
                labels:timeArr,
                datasets:[{
                    label:'支出',
                    data:costArr,
                    backgroundColor:'rgba(255, 99, 60)',
                    borderColor:'rgba(255, 99, 60)',
                    borderWidth:2,
                    pointRadius: 1,
                },{
                    label:'收入',
                    data:incomeArr,
                    backgroundColor:'rgb(75, 192, 192)',
                    borderColor:'rgb(75, 192, 192)',
                    borderWidth:2,
                    pointRadius: 1,
                }],   
            }
            
        } //两个{{}}才ok
             
        
        />
    )

}

export default LinearChart