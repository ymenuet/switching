import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../../actions/formationActions.js'
import { Link } from 'react-router-dom'
import Container from '../../components/Container'
import classes from '../../styles/Formations.module.css'

const Formations = () => {
  const dispatch = useDispatch()

  const formationList = useSelector((state) => state.formationList)
  const { loading, error, formations } = formationList

  useEffect(() => {
    dispatch(listFormations())
  }, [dispatch])

  return (
    <Container>
      <h1 className='text-center my-4'>Formations</h1>

      {loading ? (
        <h1>Loading</h1>
      ) : error ? (
        <h3>Error</h3>
      ) : (
        <>
          {formations.map((formation) => {
            return (
              <div className={classes.Formation} key={formation._id}>
                <h3>{formation.title}</h3>
                <p>Description: {formation.shortDescription}</p>
                <p>Difficulté: {formation.difficulty}</p>
                <p>Prix: $ {formation.price}</p>
                <div className={classes.FormationImgs}>
                  <img src={formation.logo} alt={formation.logo} />
                  <img
                    src={formation.backgroundImage}
                    alt={formation.backgroundImage}
                  />
                  <img src={formation.thumbnail} alt={formation.thumbnail} />
                </div>

                <Link to='/purchase'>Je me lance</Link>
              </div>
            )
          })}
        </>
      )}
    </Container>
  )
}

export default Formations
