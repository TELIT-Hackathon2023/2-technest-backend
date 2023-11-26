import React from 'react'
import LeftbarMenu from './LeftbarMenu'
import style from './Chat.module.css'
import HistoryBar from './HistoryBar'
import ChatBoard from './ChatBoard'

function Chat() {
  return (
    <div className={style.chat}>
      
      <LeftbarMenu/>
      <HistoryBar/>
      <ChatBoard/>

    </div>
  )
}

export default Chat