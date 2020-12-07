import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../actions/formationActions.js'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'
import { useDebouncedCallback } from 'use-debounce'
import Notification from '../components/UI/Notification'

const Purchase = () => {
  const dispatch = useDispatch()
  const formationList = useSelector((state) => state.formationList)
  const { loading, error, formations } = formationList
  const [chosenFormation, setChosenFormation] = useState({
    title: '',
    price: '',
  })
  const [message, setMessage] = useState('')
  const [purchasePhase, setPurchasePhase] = useState(0)
  const [email, setEmail] = useState('')
  const [userExists, setUserExists] = useState(true)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [paymentError, setPaymentError] = useState('')

  const userLogin = useSelector((state) => state.userLogin)
  const userRegister = useSelector((state) => state.userRegister)
  const {
    loading: userRegisterLoading,
    error: userRegisterError,
    userInfo: userSuccessInfo,
  } = userRegister

  const { userInfo } = userLogin

  const debounced = useDebouncedCallback((value) => {
    axios.get(`/api/users/emails/${value}`).then((res) => {
      if (res.data === 'User not found') {
        setUserExists(false)
      } else if (res.data === 'User found') {
        setUserExists(true)
      }
    })
  }, 2000)

  const stripe = useStripe()
  const elements = useElements()

  const prev = () => setPurchasePhase((purchasePhase) => purchasePhase - 1)
  const next = () => setPurchasePhase((purchasePhase) => purchasePhase + 1)

  const handleEmailTyping = (value) => {
    setEmail(value)
  }

  useEffect(() => {
    if (purchasePhase === 1) {
      debounced.callback(email)
    }
    if (userInfo) {
      setEmail(userInfo.email)
    }
  }, [email])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (userExists) {
      handlePay()
    } else {
      if (password !== confirmPassword) {
        setMessage('Passwords do not match')
      } else {
        console.log(email)
        console.log(password)
        dispatch(register('', '', '', '', '', '', email, password)).then(() =>
          handlePay()
        )
      }
    }
  }

  const handlePay = async (event) => {
    if (!stripe || !elements) {
      return
    }

    const { data: clientSecret } = await axios.post('/api/payments', {
      amount: parseInt(chosenFormation.price) * 100,
      email: email,
      formationId: chosenFormation._id,
      password: password,
      confirmPassword: confirmPassword,
    })

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'bob',
        email: email,
      },
    })
    if (error) {
      console.log('the error is ', error)
      setPaymentError(error.message)
    }
    try {
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      })
      next()
    } catch (err) {
      console.log('another error is', err)
    }
  }

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  console.log(chosenFormation)

  const userForm = userInfo ? (
    <Notification
      type='info'
      message1={`Vous êtes connecté(e) avec ${userInfo.email}`}
      message2='Le formation achetée sera associée au compte correspondant à cet email.'
    />
  ) : (
    <form>
      <div>
        <label htmlFor=''>Entrez votre email</label>
        <input
          type='text'
          placeholder='votre email'
          value={email}
          onChange={(e) => handleEmailTyping(e.target.value)}
        />
      </div>
      {userExists ? null : (
        <>
          <div>
            <label htmlFor=''>Créez votre de passe</label>
            <input
              type='password'
              placeholder='votre mot de passe'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor=''>Confirmez votre mot de passe</label>
            <input
              type='password'
              placeholder='confirmez votre mot de passe'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}
    </form>
  )

  const ChooseFormation = (
    <>
      <label>Sélectionnez la formation qui vous intéresse</label>
      {loading ? (
        <p>Loading</p>
      ) : (
        <select
          name='formation'
          id='formation'
          value={chosenFormation.title}
          onChange={(e) =>
            setChosenFormation(
              formations.find((f) => (f.title = e.target.value))
            )
          }
        >
          {formations.map((formation) => {
            return (
              <option key={formation.id} value={formation.title}>
                {`${formation.title} (${formation.price}€)`}
              </option>
            )
          })}
        </select>
      )}
    </>
  )

  const PaymentDetails = (
    <>
      <h2>Paiement</h2>
      {JSON.stringify(userSuccessInfo)}
      {userForm}

      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type='submit' disabled={!stripe}>
          Pay
        </button>
      </form>
    </>
  )
  const PaymentConfirmation = (
    <>
      <h2>Confirmation</h2>
      <p>
        Vous êtes sur le point d'acheter la formation{' '}
        <strong>{chosenFormation.title}</strong> au prix de{' '}
        <strong>{chosenFormation.price}€</strong> avec les coodonnées suivantes:
      </p>
      <ul>
        <li>Email: {email}</li>
        <li>Numéro de carte: **********7012</li>
      </ul>
    </>
  )

  const Thanks = (
    <>
      <h2>Merci!</h2>
    </>
  )

  let currentScreen = null
  switch (purchasePhase) {
    case 0:
      currentScreen = ChooseFormation
      break
    case 1:
      currentScreen = PaymentDetails
      break
    case 2:
      currentScreen = PaymentConfirmation
      break
    case 3:
      currentScreen = Thanks
  }

  return (
    <FormContainer>
      <h1 className='text-center mb-4'>Je me lance</h1>
      {message}
      {userRegisterError}
      {currentScreen}
      {paymentError}

      {purchasePhase > 0 && purchasePhase < 4 && (
        <button onClick={prev}>Previous</button>
      )}
      {purchasePhase < 3 && <button onClick={next}>Next</button>}
    </FormContainer>
  )
}

export default Purchase
