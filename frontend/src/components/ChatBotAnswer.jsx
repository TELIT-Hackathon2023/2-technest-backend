import React, { useState, useEffect } from 'react';
import style from './ChatBotAnswer.module.css';

function ChatBotAnswer(props) {
    const [typedText, setTypedText] = useState('');
    const typingSpeed = 30; // speed in milliseconds

    useEffect(() => {
        if (props.participant === "AI") {
            const textToType = props.text;
            let typingIndex = 0;

            const typeText = () => {
                if (typingIndex < textToType.length) {
                    setTypedText(prev => prev + textToType.charAt(typingIndex));
                    typingIndex++;
                    setTimeout(typeText, typingSpeed);
                }
            };

            typeText();
        }
    }, [props.participant]); // Effect depends on the participant prop

    console.log(props);

    return (
        <div className={style.answer}>
            <div className={style.answer_header}>
                {props.participant === "AI" ? (
                    <>
                        <div className={style.answer_header_icon}>AI</div>
                        <div className={style.answer_header_name}>Tardis</div>
                    </>
                ) : (
                    <>
                        <div className={style.answer_header_icon_user}>U</div>
                        <div className={style.answer_header_name}>User</div>
                    </>
                )}
            </div>

            <div className={style.answer_context}>
                {props.participant === "AI" ? typedText : props.text}
            </div>
        </div>
    );
}

export default ChatBotAnswer;
