import React from 'react'
import LeftbarMenu from './LeftbarMenu'
import style from './Chat.module.css'
import styles from './Chat.module.css'
import HistoryBar from './HistoryBar'

function Chat() {
  return (
    <div className={styles.chat}>
        <LeftbarMenu/>
        <HistoryBar/>


    </div>

  )
}

export default Chat