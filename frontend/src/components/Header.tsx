import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const headerStyle = {
  width: '100vw',
  height: '100px',
  border: '1px solid',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
}

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <div style={headerStyle}>
      <NavLink to='/'>home</NavLink>
      <NavLink to='/about'>about</NavLink>
      <NavLink to='/formations'>formations</NavLink>
      <NavLink to='/register '>register</NavLink>
      <NavLink to='/purchase'>purchase</NavLink>
      <NavLink to='/404'>404</NavLink>
      {userInfo ? (
        <>
          <NavLink to='/profile'>Profile</NavLink>
          <p onClick={logoutHandler}>Logout</p>
        </>
      ) : (
        <NavLink to='/login'>Login</NavLink>
      )}
    </div>
  )
}

export default Header
