import React from 'react'
import classes from '../../styles/Button.module.css'

const Button = (props: any) => {
  return (
    <button className={[classes[props.type], classes.BtnSwitching].join(' ')}>
      <div></div>
      {props.children}
    </button>
  )
}

export default Button
