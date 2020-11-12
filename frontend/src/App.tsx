import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Formations from './pages/Formations'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserList from './pages/UserList'
import UserEdit from './pages/UserEdit'
import Purchase from './pages/Purchase'
import NotFound from './pages/404'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/profile' component={Profile} />
        <Route path='/admin/user-list' component={UserList} />
        <Route path='/admin/users/:id/edit' component={UserEdit} />
        <Route path='/404' component={NotFound} />
        <Route path='/about' component={About} />
        <Route path='/formations' exact component={Formations} />
        <Route path='/purchase' component={Purchase} />
        <Redirect from='/' to='/404' />
      </Switch>
      <Footer />
    </div>
  )
}

export default App
