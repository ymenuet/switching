import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../../actions/formationActions.js'

const Purchase = () => {
  const dispatch = useDispatch()

  const formationList = useSelector((state: any) => state.formationList)
  const { loading, error, formations } = formationList
  const [chosenFormation, setChosenFormation] = useState('')
  const [purchasePhase, setPurchasePhase] = useState(0)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
  }

  console.log(chosenFormation)

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  let currentScreen = null
  switch (purchasePhase) {
    case 0:
      currentScreen = <h1>Select a formation</h1>
      break
    case 1:
      currentScreen = <h1>Payment details</h1>
      break
    case 2:
      currentScreen = <h1>Payment confirmation</h1>
      break
    case 3:
      currentScreen = <h1>Thank you</h1>
  }

  return (
    <div>
      <h1>Je me lance</h1>

      <ul>
        <li>All payment pages</li>
        <li>Stripe integration</li>
        <li>Payment creates a user in DB with that email</li>
        <button onClick={() => setPurchasePhase(purchasePhase + 1)}>
          Next
        </button>
        <button onClick={() => setPurchasePhase(purchasePhase - 1)}>
          Previous
        </button>
        {currentScreen}

        <div>
          <label>Sélectionnez la formation qui vous intéresse</label>
          {loading ? (
            <p>Loading</p>
          ) : (
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
          )}
        </div>
      </ul>
    </div>
  )
}

export default Purchase
