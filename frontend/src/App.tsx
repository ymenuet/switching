import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Formations from './pages/Formations'
import Formation from './pages/Formation'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import UserEdit from './pages/UserEdit'
import FormationsAdmin from './pages/FormationsAdmin'
import FormationEdit from './pages/FormationEdit'
import Purchase from './pages/Purchase'
import NotFound from './pages/404'
import Header from './components/Header'
import Footer from './components/Footer'
import Container from './components/Container'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Container>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/profile' component={Profile} />
          <Route path='/admin/formation-list' component={FormationsAdmin} />
          <Route path='/admin/formations/:id/edit' component={FormationEdit} />
          <Route path='/admin/user-list' component={UserList} />
          <Route path='/admin/users/:id/edit' component={UserEdit} />
          <Route path='/404' component={NotFound} />
          <Route path='/about' component={About} />
          <Route path='/formations' exact component={Formations} />
          <Route path='/formations/:id' component={Formation} />
          <Route path='/purchase' component={Purchase} />
          <Redirect from='/' to='/404' />
        </Container>
      </Switch>
      <Footer />
    </div>
  )
}

export default App
