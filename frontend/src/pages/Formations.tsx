import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../actions/formationActions.js'
import { Link } from 'react-router-dom'
import classes from '../styles/Formations.module.css'

const Formations = () => {
  const dispatch = useDispatch()

  const formationList = useSelector((state: any) => state.formationList)
  const { loading, error, formations } = formationList

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  return (
    <>
      <h1>formations</h1>
      <ul>
        <li>Fetch courses from mongoDB (only promotional stuff)</li>
        <li>Ability to view individual formation (popup or fake page)</li>
      </ul>
      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h3>Error</h3>
      ) : (
        <p>
          {formations.map((formation: any) => {
            return (
              <div className={classes.Formation}>
                <h3>{formation.title}</h3>
                <p>Description: {formation.shortDescription}</p>
                <p>Difficulté: {formation.difficulty}</p>
                <p>Prix: $ {formation.price}</p>
                <img src={formation.logo} alt={formation.logo} />
                <img
                  src={formation.backgroundImage}
                  alt={formation.backgroundImage}
                />
                <img src={formation.thumbnail} alt={formation.thumbnail} />
                <Link to='/purchase'>Je me lance</Link>
              </div>
            )
          })}
        </p>
      )}
    </>
  )
}

export default Formations
