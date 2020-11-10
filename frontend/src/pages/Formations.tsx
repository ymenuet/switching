import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../actions/formationActions.js'
import { Link } from 'react-router-dom'

const Formations = () => {
  const dispatch = useDispatch()

  const formationList = useSelector((state: any) => state.formationList)
  const { loading, error, formations } = formationList
  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  // const formations: string[] = []

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
              <div>
                <h3>{formation.title}</h3>
                <p>{formation.shortDescription}</p>
                <p>{formation.difficulty}</p>
                <p>{formation.price}</p>
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
