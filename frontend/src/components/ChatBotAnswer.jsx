import React from 'react';
import Typewriter from "typewriter-effect";
import style from './ChatBotAnswer.module.css';

function ChatBotAnswer({ role, text }) {
    return (
        <div className={style.answer}>
            <div className={style.answer_header}>
                {role === "AI" ? (
                    <>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}><div className={style.answer_header_icon}>AI</div>
                            <div className={style.answer_header_name}>Tardis</div></div>
                        <span style={{ marginTop: "0.05rem" }}>
                            <Typewriter
                                options={{
                                    delay: 10
                                }}
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString(text)
                                        .start();
                                }}

                            />
                        </span>
                    </>
                ) : (
                    <>
                        <div className={style.answer_header_icon_user}>U</div>
                        <div className={style.answer_header_name}>User</div>
                        {text}
                    </>
                )}
            </div>
        </div>
    );
}

export default ChatBotAnswer;
