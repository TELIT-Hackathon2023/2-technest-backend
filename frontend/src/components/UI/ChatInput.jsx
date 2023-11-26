import React, {useState} from 'react'
import style from './ChatInput.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";

function ChatInput() {

    const [userMsg,setUsrMsg] = useState("");

    async function sendData(){

        const response = await fetch(`http://localhost:8000/prompt?data=${userMsg}`);
        const jsonResponse = await response.json();
        console.log(jsonResponse.answer);
    }


  return (
    <div className={style.chat_input}>

        <input onChange={(event)=> setUsrMsg(event.target.value)}
            value={userMsg}
            className={style.input} placeholder="Write your answer"/>
        <div className={style.button} onClick={sendData}>
            <FontAwesomeIcon icon={faArrowAltCircleUp}></FontAwesomeIcon>
        </div>

    </div>
  )
}

export default ChatInput