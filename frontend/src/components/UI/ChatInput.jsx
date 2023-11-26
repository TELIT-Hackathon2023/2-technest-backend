import React, {useState} from 'react'
import style from './ChatInput.module.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleUp} from "@fortawesome/free-solid-svg-icons";
import {serverUrlConnection} from "../../settings/ConnectionSettings"
function ChatInput({ onNewMessage }) {

    const [userMsg,setUsrMsg] = useState("");

    async function sendData(){

        onNewMessage({ role: 'USER', text: userMsg });

        const response = await fetch(`${serverUrlConnection}/prompt?data=${userMsg}`,
            {
                headers: new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
            });
        const jsonResponse = await response.json();

        console.log(jsonResponse.answer);
        onNewMessage({ role: 'AI', text: ""+jsonResponse.answer });

        setUsrMsg("");


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