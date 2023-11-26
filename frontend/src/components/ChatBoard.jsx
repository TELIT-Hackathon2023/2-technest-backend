import React, { useContext, useEffect, useState } from 'react'
import ChatBotAnswer from "./ChatBotAnswer";
import style from "./ChatBoard.module.css"
import ChatInput from "./UI/ChatInput";
import { ConversationsContext } from '../ConversationsContext';


function ChatBoard() {
  const { conversation } = useContext(ConversationsContext)

  return (
    <div className={style.chatboard}>
      <div>
        {conversation.messages.map(p => (
          <ChatBotAnswer key={p.role + p.text} role={p.role} text={p.text} />
        ))}
      </div>

      <ChatInput />

    </div>
  )
}

export default ChatBoard