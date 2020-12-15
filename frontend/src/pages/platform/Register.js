import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import Notification from '../../components/UI/Notification'

const Register = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [avatar, setAvatar] = useState('')
  const [residentialAddress, setResidentialAddress] = useState({
    address: '',
    postalCode: '',
    city: '',
    country: '',
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        register(
          firstName,
          lastName,
          birthDate,
          avatar,
          residentialAddress,
          phoneNumber,
          email,
          password
        )
      )
    }
  }

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, userInfo, redirect])

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && (
        <Notification type='success' message1='Bravo!' message2={message} />
      )}
      {error && (
        <Notification
          type='warning'
          message1='Erreur! Lisez les détails ci-dessous:'
          message2={error}
        />
      )}
      {loading && <p>Loading</p>}
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor=''>First Name</label>
          <input
            type='name'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor=''>Last Name</label>
          <input
            type='name'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor=''>Date Of Birth</label>
          <input
            type='date'
            placeholder='Enter birthDate'
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor=''>Avatar</label>
          <input
            type='text'
            placeholder='Enter Avatar'
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor=''>Residential Address</label>
          <input
            type='address'
            placeholder='Enter address'
            value={residentialAddress.address}
            onChange={(e) =>
              setResidentialAddress({
                address: e.target.value,
                postalCode: residentialAddress.postalCode,
                city: residentialAddress.city,
                country: residentialAddress.country,
              })
            }
          />

          <input
            type='address'
            placeholder='Enter postal code'
            value={residentialAddress.postalCode}
            onChange={(e) =>
              setResidentialAddress({
                address: residentialAddress.address,
                postalCode: e.target.value,
                city: residentialAddress.city,
                country: residentialAddress.country,
              })
            }
          />

          <input
            type='address'
            placeholder='Enter city'
            value={residentialAddress.city}
            onChange={(e) =>
              setResidentialAddress({
                address: residentialAddress.address,
                postalCode: residentialAddress.postalCode,
                city: e.target.value,
                country: residentialAddress.country,
              })
            }
          />

          <input
            type='address'
            placeholder='Enter country'
            value={residentialAddress.country}
            onChange={(e) =>
              setResidentialAddress({
                address: residentialAddress.address,
                postalCode: residentialAddress.postalCode,
                city: residentialAddress.city,
                country: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label htmlFor=''>Phone Number</label>
          <input
            type='tel'
            placeholder='Enter phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

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

        <div>
          <label htmlFor=''>Confirm Password</label>
          <input
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type='submit'>Register</button>
        <p>
          Have an account?{' '}
          <Link to={redirect ? `/login/redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </p>
      </form>
    </FormContainer>
  )
}

export default Register
