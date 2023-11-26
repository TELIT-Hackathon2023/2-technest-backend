import React from 'react'
import ChatBotAnswer from "./ChatBotAnswer";
import style from "./ChatBoard.module.css"
import ChatInput from "./UI/ChatInput";

function ChatBoard() {
  return (
    <div className={style.chatboard}>

        <div>
            <ChatBotAnswer participant={"AI"} text={"Hi! How can I help you with"}/>
            <ChatBotAnswer participant={"USER"} text={"Write me how find my mind. CAN: Understood! I'll modify the ChatBotAnswer component so that the typing animation only occurs when the participant prop is \"AI\". We'll make use of a conditional within the useEffect hook to check the participant, and only initiate the typing effect for the AI's responses. Here's the revised component:"}/>


        </div>

        <ChatInput/>

    </div>
  )
}

export default ChatBoard