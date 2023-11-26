import React, {useState} from 'react'
import style from './ChatInput.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import {serverUrlConnection} from "../../settings/ConnectionSettings"
function ChatInput() {

    const [userMsg,setUsrMsg] = useState("");

    async function sendData(){

        const response = await fetch(`${serverUrlConnection}/prompt?data=${userMsg}`);
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