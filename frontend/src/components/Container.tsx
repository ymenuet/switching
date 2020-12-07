import React from 'react'
import classes from '../styles/Container.module.css'

const Container = (props: any) => {
  return <div className={classes.Container}>{props.children}</div>
}

export default Container
