import React from 'react'
import style from './UpperButtons.modules.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleQuestion, faGears, faHouse, faPlus, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import ButtonMenu from './ButtonMenu'

function BottomButtons() {
  return (
    <div className={style.wraper} >
        <ButtonMenu btnType={<FontAwesomeIcon icon={faCircleQuestion} />}/>
        <ButtonMenu btnType={<FontAwesomeIcon icon={faGears} />}/>
        <ButtonMenu btnType={<FontAwesomeIcon icon={faUserCircle} />}/>
    </div>
  )
}

export default BottomButtons