import React from 'react'
import style from './ButtonMenu.module.css'

function ButtonMenu({btnType}) {
  return (
    <div className={style.button}>
        {btnType}
    </div>
  )
}

export default ButtonMenu