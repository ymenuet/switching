import React from 'react'

const contact = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }
  return (
    <div>
      <h1>Contact</h1>
      <form method='POST' onSubmit={handleSubmit}>
        <input type='text' />
        <input type='submit' />
        <p>Sélection de la formation</p>
        <p>Nom</p>
        <p>Prénom</p>
        <p>Numéro de téléphone</p>
        <p>Date et horaire de prise de rendez-vous</p>
        <p>Adresse mail</p>
      </form>
    </div>
  )
}

export default contact
