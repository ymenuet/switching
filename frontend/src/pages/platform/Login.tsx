import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'

const Login = (props: any) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const userLogin = useSelector((state: any) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'
  const submitHandler = (e: any) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, userInfo, redirect])
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <p>{JSON.stringify(error)}</p>}
      {loading && <p>Loading</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor=''>Email Address</label>
          <input
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor=''>Password</label>
          <input
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Sign In</button>
        <p>
          New customer?{' '}
          <Link to={redirect ? `/register/redirect=${redirect}` : '/register'}>
            <strong>Register</strong>
          </Link>
        </p>
      </form>
    </FormContainer>
  )
}

export default Login
