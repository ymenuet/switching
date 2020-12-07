import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import Logo from '../../images/logo-text.png'
import classes from '../../styles/Header.module.css'
import { Button, Dropdown, ButtonGroup } from 'react-bootstrap'

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
        <NavLink className={classes.NavLink} to='/'>
          Accueil
        </NavLink>
        <NavLink className={classes.NavLink} to='/formations'>
          Formations
        </NavLink>
        <NavLink className={classes.NavLink} to='/about'>
          À propos
        </NavLink>
        <NavLink className={classes.NavLink} to='/purchase'>
          Je m'inscris
        </NavLink>
        {userInfo ? (
          <Dropdown as={ButtonGroup}>
            <Button variant='success'>Mes cours</Button>
            <Dropdown.Toggle
              split
              variant='success'
              id='dropdown-split-basic'
            />
            <Dropdown.Menu>
              <Dropdown.Item>
                <NavLink to='/profile'>Mon Profil</NavLink>
              </Dropdown.Item>
              {userInfo.isAdmin && (
                <>
                  <Dropdown.Item>
                    <NavLink to='/admin/user-list'>
                      Gestion des utilisateurs
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink to='/admin/formation-list'>
                      Gestion des Formations
                    </NavLink>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                </>
              )}

              <Dropdown.Item href='#/action-3'>
                {' '}
                <span onClick={logoutHandler}>Déconnexion</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <>
            <Button variant='primary'>
              <NavLink to='/register'>s'inscrire</NavLink>
            </Button>{' '}
            <Button variant='secondary'>
              {' '}
              <NavLink to='/login'>connexion</NavLink>
            </Button>{' '}
          </>
        )}
      </div>
    </div>
  )
}

export default Header
