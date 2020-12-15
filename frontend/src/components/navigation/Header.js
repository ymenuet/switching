import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../actions/userActions'
import Logo from '../../images/logo-text.png'
import classes from '../../styles/Header.module.css'
import { Button, Dropdown, ButtonGroup, Nav } from 'react-bootstrap'
import CustomButton from '../UI/CustomButton'
import HamburgerMenu from '../UI/HamburgerMenu'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
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
          {!userInfo && (
            <NavLink className={classes.NavLink} to='/purchase'>
              <CustomButton type='Success'>Je m'inscris</CustomButton>
            </NavLink>
          )}

          {userInfo ? (
            <Dropdown as={ButtonGroup}>
              <Button variant='success'>
                <NavLink to='/mes-cours'>Mes cours</NavLink>
              </Button>
              <Dropdown.Toggle
                split
                variant='success'
                id='dropdown-split-basic'
              />
              <Dropdown.Menu>
                <Nav.Link as={NavLink} to='/profile'>
                  Mon Profil
                </Nav.Link>

                <Nav.Link as={NavLink} to='/mes-cours'>
                  Mes formations
                </Nav.Link>

                <Nav.Link as={NavLink} to='/purchase'>
                  Ajouter une formation
                </Nav.Link>

                {userInfo.isAdmin && (
                  <>
                    <Nav.Link as={NavLink} to='/admin/user-list'>
                      Gestion des utilisateurs
                    </Nav.Link>

                    <Nav.Link as={NavLink} to='/admin/formation-list'>
                      Gestion des Formations
                    </Nav.Link>

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
            <NavLink to='/login'>
              {' '}
              <CustomButton type='Secondary'>Connexion</CustomButton>
            </NavLink>
          )}
        </div>
        <HamburgerMenu userInfo={userInfo} logoutHandler={logoutHandler} />
      </div>
    </header>
  )
}

export default Header
