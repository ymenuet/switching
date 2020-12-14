import React, { useState, useEffect } from 'react'
import classes from '../../styles/HamburgerMenu.module.css'
import Hamburger from '../../images/hamburger.png'
import { NavLink } from 'react-router-dom'

import CustomButton from '../UI/CustomButton'

const HamburgerMenu = ({ userInfo, logoutHandler }) => {
  const [showSidebar, setShowSidebar] = useState(false)
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className={classes.HamburgerMenu}>
      <img src={Hamburger} alt='hamburger menu' onClick={toggleSidebar} />
      <div
        className={[
          classes.Backdrop,
          showSidebar ? null : classes.BackdropHide,
        ].join(' ')}
        onClick={toggleSidebar}
      ></div>
      <div
        className={[
          classes.Sidebar,
          showSidebar ? classes.SidebarShow : classes.SidebarHide,
        ].join(' ')}
      >
        <NavLink className={classes.NavLink} onClick={toggleSidebar} to='/'>
          Accueil
        </NavLink>
        <NavLink
          className={classes.NavLink}
          onClick={toggleSidebar}
          to='/formations'
        >
          Formations
        </NavLink>
        <NavLink
          className={classes.NavLink}
          onClick={toggleSidebar}
          to='/about'
        >
          À propos
        </NavLink>
        {!userInfo && (
          <NavLink
            className={classes.NavLink}
            onClick={toggleSidebar}
            to='/purchase'
          >
            <CustomButton type='Success'>Je m'inscris</CustomButton>
          </NavLink>
        )}

        {userInfo ? (
          <>
            <NavLink onClick={toggleSidebar} to='/mes-cours'>
              Mes cours
            </NavLink>
            <NavLink onClick={toggleSidebar} to='/profile'>
              Mon Profil
            </NavLink>
            <NavLink onClick={toggleSidebar} to='/mes-cours'>
              Mes formations
            </NavLink>
            <NavLink onClick={toggleSidebar} to='/purchase'>
              Ajouter une formation
            </NavLink>
            {userInfo.isAdmin && (
              <>
                <NavLink onClick={toggleSidebar} to='/admin/user-list'>
                  Gestion des utilisateurs
                </NavLink>

                <NavLink onClick={toggleSidebar} to='/admin/formation-list'>
                  Gestion des Formations
                </NavLink>
              </>
            )}{' '}
            <span onClick={logoutHandler}>Déconnexion</span>
          </>
        ) : (
          <NavLink onClick={toggleSidebar} to='/login'>
            {' '}
            <CustomButton type='Secondary'>Connexion</CustomButton>
          </NavLink>
        )}
      </div>
    </div>
  )
}

export default HamburgerMenu
