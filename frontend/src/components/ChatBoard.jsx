import React from 'react'
import ChatBotAnswer from "./ChatBotAnswer";
import style from "./ChatBoard.module.css"
import ChatInput from "./UI/ChatInput";

function ChatBoard() {
  return (
    <div className={style.chatboard}>

        <div>
            <ChatBotAnswer participant={"AI"}/>
            <ChatBotAnswer participant={"USER"}/>


        </div>

        <ChatInput/>

    </div>
  )
}

export default ChatBoard