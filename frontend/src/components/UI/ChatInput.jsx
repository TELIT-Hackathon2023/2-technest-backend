import React from 'react'
import style from './ChatInput.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";

function ChatInput() {
  return (
    <div className={style.chat_input}>

        <input className={style.input} placeholder="Write your answer"/>
        <div className={style.button}>
            <FontAwesomeIcon icon={faArrowAltCircleUp}></FontAwesomeIcon>
        </div>

    </div>
  )
}

export default ChatInput