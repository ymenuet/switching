import React from 'react'
import FormContainer from '../pages/FormContainer'

const contact = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }
  return (
    <div>
      <FormContainer>
        <h1>Contact</h1>
        <form method='POST' onSubmit={handleSubmit}>
          <label>email</label>
          <input type='email' />
          <label>Titre</label>
          <input type='text' />
          <label>Message</label>
          <input type='text' />
          <input type='submit' />
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

export default contact
