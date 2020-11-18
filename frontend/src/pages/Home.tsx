import React from 'react'
import ContactForm from '../components/ContactForm'

const home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ul>
        <li>Fullscreen gif</li>
        <p>Prendre rendez-vous avec un conseiller (Contact compoent)</p>
        <ContactForm />
      </ul>
    </div>
  )
}

export default home
