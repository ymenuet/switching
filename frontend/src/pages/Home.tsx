import React from 'react'
import ContactForm from '../components/ContactForm'
import classes from '../styles/Home.module.css'
import Button from '../components/UI/Button'

const Home = () => {
  return (
    <div>
      <div className={classes.Section}>
        <h1 className='mb-4'>Ma passion, j'apprends, je deviens.</h1>
        <Button type='PointNoir'>Découvrir nos programmes</Button>
      </div>
      <div className={[classes.Section, classes.LightBlue].join(' ')}>
        <ContactForm />
      </div>
    </div>
  )
}

export default Home
