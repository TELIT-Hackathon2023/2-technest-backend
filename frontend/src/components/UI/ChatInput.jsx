import { faArrowAltCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from 'react';
import { ConversationsContext } from '../../ConversationsContext';
import style from './ChatInput.module.css';

function ChatInput() {
    const { sendMessage } = useContext(ConversationsContext);
    const [userMsg, setUsrMsg] = useState("");

    async function sendData() {
        await sendMessage(userMsg);
        setUsrMsg("");
    }


    return (
        <div className={style.chat_input}>

            <input onChange={(event) => setUsrMsg(event.target.value)}
                value={userMsg}
                className={style.input} onKeyDown={(e) => e.key === "Enter" && sendData()} placeholder="Write your answer" />
            <div className={style.button} onClick={sendData}>
                <FontAwesomeIcon icon={faArrowAltCircleUp}></FontAwesomeIcon>
            </div>

        </div>
    )
}

export default ChatInput