import React from 'react'
import style from './UpperButtons.modules.css'
import ButtonMenu from './ButtonMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faHouse, faPlus } from '@fortawesome/free-solid-svg-icons'
import HUI from './UI/HUI'


function UpperButtons() {
  return (
    <div className={style.wraper} >
        <HUI/>
        <ButtonMenu btnType={<FontAwesomeIcon icon={faPlus} />}/>
    </div>
  )
}

export default UpperButtons