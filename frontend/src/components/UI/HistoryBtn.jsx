import React, {useState} from 'react'
import styles from './HistoryBtn.module.css'

function HistoryBtn({setState,historyText, historyId}) {

  const [status,setStatus] = useState(false);

  const onHandleChoose = ()=>{
    setStatus(!status);
    // setState({id:historyId,hist:historyText})
  }

  return (

    <button onClick={()=> onHandleChoose()} className={`${styles.history_btn} `}>{historyText}</button>
  )
}

export default HistoryBtn