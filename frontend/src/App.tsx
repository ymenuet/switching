import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './components/ContactForm'
import Formations from './pages/Formations'
import Login from './pages/Login'
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
