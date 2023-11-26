import React from 'react'
import style from './HUI.module.css'
import logo from '../../logo.jpg'

function HUI() {
  return (
    <div className={style.HUI}>
        <img src={logo} alt='HUI'/>
    </div>
  )
}

export default HUI