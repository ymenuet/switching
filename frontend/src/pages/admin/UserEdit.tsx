import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../../actions/userActions'
import FormContainer from '../../components/FormContainer'
import { USER_UPDATE_RESET } from '../../constants/userConstants'

const UserEdit = (props: any) => {
  const userId = props.match.params.id

  const [isAdmin, setIsAdmin] = useState(false)
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
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userDetails = useSelector((state: any) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state: any) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const submitHandler = (e: any) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        firstName,
        lastName,
        birthDate,
        avatar,
        residentialAddress,
        phoneNumber,
        email,
        isAdmin,
      })
    )
  }

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      props.history.push('/admin/user-list')
    } else {
      if (user?.name || user?._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
        setBirthDate(user.birthDate)
        setAvatar(user.avatar || '')
        setResidentialAddress(user.residentialAddress || {})
        setPhoneNumber(user.phoneNumber)
      }
    }
  }, [dispatch, userId, props.history, user, successUpdate])

  return (
    <>
      <Link to='/admin/user-list'>Go back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <p>Loading</p>}
        {errorUpdate && <p>{errorUpdate}</p>}
        {message && <p>{message}</p>}
        {error && <p>{JSON.stringify(error)}</p>}
        {loading ? (
          <p>Loading</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
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

            <label htmlFor=''>Admin?</label>
            <input
              type='checkbox'
              placeholder='Is admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />

            <button type='submit'>Update</button>
          </form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEdit
