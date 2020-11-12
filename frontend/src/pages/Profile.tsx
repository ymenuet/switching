import React, { useState, useEffect } from 'react'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const Profile = (props: any) => {
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

  const userDetails = useSelector((state: any) => state.userDetails)

  const { loading, error, user } = userDetails

  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin

  const userUpdateProfile = useSelector((state: any) => state.userUpdateProfile)
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

  const submitHandler = (e: any) => {
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
    <div>
      <h1>My Profile </h1>
      {error && <p>{JSON.stringify(error)}</p>}
      {loading && <p>Loading</p>}
      {success ? 'success' : 'fail'}
      <form onSubmit={submitHandler}>
        <label htmlFor=''>First Name</label>
        <input
          type='name'
          placeholder='Enter first name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label htmlFor=''>Last Name</label>
        <input
          type='name'
          placeholder='Enter last name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <label htmlFor=''>Date Of Birth</label>
        <input
          type='date'
          placeholder='Enter birthDate'
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />

        <label htmlFor=''>Avatar</label>
        <input
          type='text'
          placeholder='Enter Avatar'
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />

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

        <label htmlFor=''>Phone Number</label>
        <input
          type='tel'
          placeholder='Enter phone number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <label htmlFor=''>Email Address</label>
        <input
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor=''>Password</label>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor=''>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default Profile
