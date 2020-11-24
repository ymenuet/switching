import React from 'react'
import { Route, Switch } from 'react-router-dom'
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
import Purchase from './pages/purchase/Purchase'
import NotFound from './pages/404'
import Header from './components/Header'
import Container from './components/Container'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK!)

const App = () => {
  console.log('api key frontend:', process.env.REACT_APP_STRIPE_PK)

  return (
    <div>
      <Header />
      <Switch>
        <Container>
          <Route exact path='/' component={Home} />
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
          <Route
            path='/purchase'
            render={() => (
              <Elements stripe={stripePromise}>
                <Purchase />
              </Elements>
            )}
          />
          <Route path='*' component={NotFound} />
        </Container>
      </Switch>
    </div>
  )
}

export default App
