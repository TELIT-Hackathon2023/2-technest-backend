import React, { useContext } from 'react'
import style from './UpperButtons.modules.css'
import ButtonMenu from './ButtonMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
import HUI from './UI/HUI'
import { ConversationsContext } from '../ConversationsContext'


function UpperButtons() {
  const { newConversation } = useContext(ConversationsContext)

  return (
    <div className={style.wraper} >
      <HUI />
      <span onClick={newConversation}>
        <ButtonMenu btnType={<FontAwesomeIcon icon={faPlus} />} />
      </span>
    </div>
  )
}

export default UpperButtons