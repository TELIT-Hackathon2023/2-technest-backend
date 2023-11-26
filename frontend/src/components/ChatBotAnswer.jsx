import React, { useEffect, useRef } from 'react';
import style from './ChatBotAnswer.module.css';
import Typewriter from "typewriter-effect";

const typingSpeed = 30; // speed in milliseconds
let typingIndex = 0;
function ChatBotAnswer({ role, text, onFinish }) {
    const ref = useRef(null)

    // useEffect(() => {
    //     if (role === "AI") {
    //         let interval
    //         const typeText = () => {
    //             if (typingIndex >= text.length) {
    //                 clearInterval(interval)
    //                 onFinish?.()
    //             }
    //             if (typingIndex < text.length) {
    //                 ref.current.innerHTML += text.charAt(typingIndex);
    //                 typingIndex++;
    //             }
    //         };
    //
    //         interval = setInterval(typeText, typingSpeed);
    //
    //         return () => clearInterval(interval);
    //     } else {
    //         ref.current.innerHTML = text;
    //     }
    // }, [text]); // Effect depends on the participant prop

    return (
        <div className={style.answer}>
            <div className={style.answer_header}>
                {role === "AI" ? (
                    <>
                        <div className={style.answer_header_icon}>AI</div>
                        <div className={style.answer_header_name}>Tardis</div>
                        <Typewriter

                            onInit={(typewriter) => {
                                typewriter
                                    .typeString(text)
                                    // .delay(30)
                                    .start();
                            }}
                        />
                    </>
                ) : (
                    <>
                        <div className={style.answer_header_icon_user}>U</div>
                        <div className={style.answer_header_name}>User</div>
                        {text}
                    </>
                )}
            </div>



            {/*<div ref={ref} className={style.answer_context} />*/}
        </div>
    );
}

export default ChatBotAnswer;
