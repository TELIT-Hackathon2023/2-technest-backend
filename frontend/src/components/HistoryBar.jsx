import React, {useState} from 'react'
import styles from './HistoryBar.module.css'
import HistoryBtn from './UI/HistoryBtn'

function daysAgo(dateString) {

    const [day, month, year] = dateString.split('.').map(Number);
    const inputDate = new Date(year, month - 1, day);

    const currentDate = new Date();
    const timeDifference = currentDate - inputDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if(daysDifference===0){
        return "Today"
    }else if (daysDifference===1){
        return "Yesterday"
    }else{
        return dateString;
    }
}

function HistoryBar() {

    const [chooseStatus,setChooseStatus] = useState({id:"",hist:""});

    const arr = [
        {
            date: "26.11.2023",
            historyTags:[
                {
                    id:1,
                    history : "Targis what is it ?"
                },
                {
                    id:2,
                    history : "AI in T-Systems"
                }
                ]
        },
        {
            date: "25.11.2023",
            historyTags:[
                {
                    id:3,
                    history : "Targis system architecture"
                },
                {
                    id:4,
                    history : "Microservices in Targis"
                }
            ]
        }
    ]
  return (

    <div className={styles.history_section_container}>

        <div style={{padding :"20px 0"}}>

        {arr.map((element) => (
            <div className={styles.history_item_container} key={element.date}>
                <div className={styles.history_date_container}>
                    {daysAgo(element.date)}
                </div>
                <div className={styles.history_btns_list}>
                    {element.historyTags.map((el, index) => (
                        <HistoryBtn historyId={el.id} key={index} historyText={el.history}/>
                    ))}
                </div>
            </div>
        ))}
        </div>




    </div>
  )
}

export default HistoryBar