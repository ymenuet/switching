import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFormationDetails } from '../../actions/formationActions'

const Formation = (props) => {
  const dispatch = useDispatch()

  const formationDetails = useSelector((state) => state.formationDetails)
  const { loading, error, formation } = formationDetails

  useEffect(() => {
    dispatch(getFormationDetails(props.match.params.id))
  }, [dispatch, props.match])

  return (
    <div>
      {loading ? (
        <p>Loading</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <h1>{formation.title}</h1>
      )}
    </div>
  )
}

export default Formation
