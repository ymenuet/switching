import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import Logo from '../images/logo-text.png'
import classes from './Header.module.css'

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
    <div className={classes.NavBar}>
      <NavLink to='/'>
        <img src={Logo} alt='Logo' className={classes.NavLogo} />
      </NavLink>
      <div className={classes.NavLinks}>
        <NavLink to='/formations'>formations</NavLink>
        <NavLink to='/purchase'>je me lance</NavLink>
        <NavLink to='/register'>s'inscrire</NavLink>
        {userInfo ? (
          <>
            <NavLink to='/profile'>Mon profil</NavLink>
            <p onClick={logoutHandler}>déconnexion</p>
          </>
        ) : (
          <NavLink to='/login'>connexion</NavLink>
        )}
        {userInfo?.isAdmin && (
          <>
            <NavLink to='/admin/user-list'>Utilisateurs</NavLink>
            <NavLink to='/admin/formation-list'>Formations</NavLink>
          </>
        )}
      </div>
    </div>
  )
}

export default Header
