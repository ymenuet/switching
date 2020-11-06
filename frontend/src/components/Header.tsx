import React from 'react'
import { NavLink } from 'react-router-dom'

const headerStyle = {
  width: '100vw',
  height: '100px',
  border: '1px solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}

const header = () => {
  return (
    <div style={headerStyle}>
      <NavLink to='/'>home</NavLink>
      <NavLink to='/about'>about</NavLink>
      <NavLink to='/contact'>contact</NavLink>
      <NavLink to='/formations'>formations</NavLink>
      <NavLink to='/purchase'>purchase</NavLink>
      <NavLink to='/404'>404</NavLink>
      <NavLink to='/login'>Login</NavLink>
    </div>
  )
}

export default header
