import React, { useEffect, useState } from 'react'
import ChatBotAnswer from "./ChatBotAnswer";
import style from "./ChatBoard.module.css"
import ChatInput from "./UI/ChatInput";


function ChatBoard() {
  const [participants, setParticipants] = useState([
    { role: "USER", text: "Hello" },
    { role: "AI", text: 'Hi, how are you' }
  ])

  return (
    <div className={style.chatboard}>
      <div>
        {participants.map(p => (
          <ChatBotAnswer key={p.role + p.text} role={p.role} text={p.text} onFinish={() => console.log("Animation finished")} />
        ))}
      </div>

      <ChatInput />

    </div>
  )
}

export default ChatBoard