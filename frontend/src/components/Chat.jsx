import React from 'react'
import styles from './Chat.module.css'
import HistoryBar from './HistoryBar'

function Chat() {
  return (
    <div className={styles.chat}>

      <HistoryBar/>


    </div>
  )
}

export default Chat