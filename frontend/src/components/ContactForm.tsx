import React, { useState, useEffect } from 'react'
import FormContainer from '../pages/FormContainer'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../actions/formationActions.js'

const Contact = () => {
  const dispatch = useDispatch()

  const formationList = useSelector((state: any) => state.formationList)
  const { loading, error, formations } = formationList

  const [chosenFormation, setChosenFormation] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [appointmentDate, setAppointmentDate] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }
  const sendContactEmail = () => {
    const emailData = {
      to: `fraissearistide@gmail.com`,
      subject: `Demande de ${firstName} ${lastName}: ${chosenFormation}`,
      html: `
      <ul>
        <li>Prénom: ${firstName}</li>
        <li>Nom: ${lastName}</li>
        <li>Téléphone: ${phone}</li>
        <li>Date de rendez-vous: ${appointmentDate}</li>
        <li>Formation désirée: ${chosenFormation}</li>
      </ul>
      `,
    }
    axios.post('/api/email', emailData)
  }
  console.log(chosenFormation)

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])
  return (
    <div>
      <FormContainer>
        <h1>Nous Contacter</h1>
        <form method='POST' onSubmit={handleSubmit}>
          <div>
            <label>Sélectionnez la formation qui vous intéresse</label>
            <select
              name='formation'
              id='formation'
              value={chosenFormation}
              onChange={(e: any) => setChosenFormation(e.target.value)}
            >
              {formations.map((formation: any) => {
                return (
                  <option key={formation.id} value={formation.title}>
                    {formation.title}
                  </option>
                )
              })}
              <option value='Autre demande'>Autre demande</option>
            </select>
          </div>

          <div>
            <label>Nom de famille</label>
            <input
              type='text'
              value={lastName}
              placeholder='Entrez votre nom'
              onChange={(e: any) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label>Prénom</label>
            <input
              type='text'
              value={firstName}
              placeholder='Entez votre nom de famille'
              onChange={(e: any) => setFirstName(e.target.value)}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type='email'
              value={email}
              placeholder='Entez votre addresse email'
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>Numéro de téléphone</label>
            <input
              type='phone'
              value={phone}
              placeholder='Entez votre numéro de téléphone'
              onChange={(e: any) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label>Date/heure de rendez-vous téléphonique (optionnel)</label>
            <input
              type='date'
              value={appointmentDate}
              placeholder='Entez la date de rendez-vous'
              onChange={(e: any) => setAppointmentDate(e.target.value)}
            />
          </div>

          <button type='submit' onClick={sendContactEmail}>
            Prendre un rendez-vous
          </button>
        </form>
      </FormContainer>
      <p>Sélection de la formation</p>
      <p>Nom</p>
      <p>Prénom</p>
      <p>Numéro de téléphone</p>
      <p>Date et horaire de prise de rendez-vous</p>
      <p>Adresse mail</p>
    </div>
  )
}

export default Contact
