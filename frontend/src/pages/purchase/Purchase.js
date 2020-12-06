import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../../actions/formationActions.js'
import FormContainer from '../FormContainer'
import { register } from '../../actions/userActions'

import { createNoSubstitutionTemplateLiteral } from 'typescript'
import { useDebouncedCallback } from 'use-debounce'

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
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [creditCardExpirationDate, setCreditCardExpirationDate] = useState('')
  const [creditCardCCV, setCreditCardCCV] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: 'bob',
        email: email,
      },
    })

    if (error) {
      console.log('[error]', error)
    } else {
      console.log('[PaymentMethod]', paymentMethod)
    }
    try {
      const confirmedCardPayment = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      )
      next()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  console.log(chosenFormation)

  const userForm = userInfo ? (
    <p>You are logged in as {userInfo.email}</p>
  ) : (
    <FormContainer>
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
    </FormContainer>
  )

  const ChooseFormation = (
    <>
      <h2>Choissez la formation</h2>
      <div>
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
            <option value='Autre demande'>Autre demande</option>
          </select>
        )}
      </div>
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
        <li>
          Numéro de carte:{' '}
          {`${creditCardNumber.slice(0, 3)}**********${creditCardNumber.slice(
            -4,
            -1
          )}`}
        </li>
        <li>Date d'expiration: {creditCardExpirationDate}</li>
        <li>CCV: {creditCardCCV}</li>
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
    <>
      <h1>Je me lance</h1>
      {message}
      {userRegisterError}
      <ul>
        <li>All payment pages</li>
        <li>Stripe integration</li>
        <li>Payment creates a user in DB with that email</li>{' '}
        {purchasePhase > 0 && purchasePhase < 4 && (
          <button onClick={prev}>Previous</button>
        )}
        {purchasePhase < 3 && <button onClick={next}>Next</button>}
        {currentScreen}
      </ul>
    </>
  )
}

export default Purchase
