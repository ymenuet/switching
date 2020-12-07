import React from 'react'
import classes from '../styles/FormContainer.module.css'

const FormContainer = (props: any) => {
  return <div className={classes.FormContainer}>{props.children}</div>
}

export default FormContainer
