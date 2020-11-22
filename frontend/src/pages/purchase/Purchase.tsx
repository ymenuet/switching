import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../../actions/formationActions.js'
import FormContainer from '../FormContainer'

const Purchase = () => {
  const dispatch = useDispatch()
  const formationList = useSelector((state: any) => state.formationList)
  const { loading, error, formations } = formationList
  const [chosenFormation, setChosenFormation] = useState({
    title: '',
    price: '',
  })
  const [purchasePhase, setPurchasePhase] = useState(0)
  const [email, setEmail] = useState('')
  const [creditCardNumber, setCreditCardNumber] = useState('')
  const [creditCardExpirationDate, setCreditCardExpirationDate] = useState('')
  const [creditCardCCV, setCreditCardCCV] = useState('')

  const prev = () => setPurchasePhase((purchasePhase) => purchasePhase - 1)
  const next = () => setPurchasePhase((purchasePhase) => purchasePhase + 1)

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  console.log(chosenFormation)

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
            onChange={(e: any) =>
              setChosenFormation(
                formations.find((f: any) => (f.title = e.target.value))
              )
            }
          >
            {formations.map((formation: any) => {
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
      <FormContainer>
        <form action=''>
          <div>
            <label htmlFor=''>Entrez votre email</label>
            <input
              type='text'
              placeholder='votre email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor=''>Numéro de carte de crédit</label>
            <input
              type='text'
              placeholder='votre numéro de carte de crédit'
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor=''>Date d'expiration</label>
            <input
              type='date'
              placeholder="date d'expiration"
              value={creditCardExpirationDate}
              onChange={(e) => setCreditCardExpirationDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor=''>CCV</label>
            <input
              type='text'
              placeholder='CCV'
              value={creditCardCCV}
              onChange={(e) => setCreditCardCCV(e.target.value)}
            />
          </div>
        </form>
      </FormContainer>
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

  let currentScreen: any = null
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
    <div>
      <h1>Je me lance</h1>

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
    </div>
  )
}

export default Purchase
