import React from 'react'
import classes from '../../styles/CustomButton.module.css'

const CustomButton = ({ type, children }) => {
  return (
    <button className={[classes.CustomButton, classes[type]].join(' ')}>
      {children}
    </button>
  )
}

export default CustomButton
