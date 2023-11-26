import React from 'react'
import styles from "./LeftbarMenu.module.css"
import UpperButtons from './UpperButtons'
import BottomButtons from './BottomButtons'

function LeftbarMenu() {
  return (
    <div className={styles.leftbar_menu}>

    <UpperButtons/>
    <BottomButtons/>
        

    </div>
  )
}

export default LeftbarMenu