import React, { useState, useEffect } from 'react'
import { getUserDetails, updateUserProfile } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../../components/FormContainer'
import Notification from '../../components/UI/Notification'

const Profile = (props) => {
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

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
  const { success } = userUpdateProfile

  useEffect(() => {
    // If user isnn't logged in
    if (!userInfo) {
      props.history.push('/login')
    } else {
      if (!user?.firstName) {
        dispatch(getUserDetails('profile'))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setBirthDate(user.birthDate)
        setAvatar(user.avatar || '')
        setResidentialAddress(user.residentialAddress)
        setPhoneNumber(user.phoneNumber)
      }
    }
  }, [dispatch, props.history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          email,
          password,
          birthDate,
          avatar,
          residentialAddress,
          phoneNumber,
        })
      )
    }
  }

  return (
    <FormContainer>
      <h1>Update My Profile</h1>
      {loading && <p>Loading</p>}
      {success && (
        <Notification type='info' message1='Success' message2={message} />
      )}
      {error && (
        <Notification
          type='info'
          message1='Erreur! Lisez les détails ci-dessous:'
          message2={message}
        />
      )}
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
            placeholder='Enter birth date'
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
          />{' '}
        </div>

        <div>
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
        </div>

        <div>
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
        </div>

        <div>
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

        <button type='submit'>Update</button>
      </form>
    </FormContainer>
  )
}

export default Profile
