import React from 'react'
import style from './ChatBotAnswer.module.css'

function ChatBotAnswer(props) {

    console.log(props)


        return (
            <div className={style.answer}>

                <div className={style.answer_header}>
                    {props.participant==="AI" ?(
                        <>
                            <div className={style.answer_header_icon}>AI</div>
                            <div className={style.answer_header_name}>Tardis</div>

                        </>
                        )

                        :
                        (
                        <>
                            <div className={style.answer_header_icon_user}>U</div>
                            <div className={style.answer_header_name}>User</div>

                        </>
                        )
                    }

                </div>

                {props.participant==="AI" ?(
                    <div className={style.answer_context}>Hi! How can I help you with?</div>
                ): (
                    <div className={style.answer_context}>Some text from user on start to ask about something</div>

                )
                }



            </div>
        )



}

export default ChatBotAnswer