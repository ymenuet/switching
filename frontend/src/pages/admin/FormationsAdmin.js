import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  listFormations,
  deleteFormation,
  createFormation,
} from '../../actions/formationActions'
import { FORMATION_CREATE_RESET } from '../../constants/formationConstants'
import { Link } from 'react-router-dom'

const FormationList = (props) => {
  const dispatch = useDispatch()

  const formationList = useSelector((state) => state.formationList)
  const { loading, error, formations } = formationList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formationDelete = useSelector((state) => state.formationDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = formationDelete

  const formationCreate = useSelector((state) => state.formationCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    formation: createdFormation,
  } = formationCreate

  useEffect(() => {
    dispatch({ type: FORMATION_CREATE_RESET })
    if (!userInfo.isAdmin) {
      props.history.push('/login')
    }

    if (successCreate) {
      props.history.push(`/admin/formations/${createdFormation._id}/edit`)
    } else {
      dispatch(listFormations())
    }
  }, [
    dispatch,
    props.history,
    userInfo,
    successDelete,
    successCreate,
    createdFormation,
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteFormation(id))
    }
  }

  const createFormationHandler = () => {
    dispatch(createFormation())
  }

  return (
    <>
      <h1>Formations</h1>
      <button onClick={createFormationHandler}>Create a formation</button>
      {loadingDelete && <p>Loading Delete</p>}
      {errorDelete && <p>{errorDelete}</p>}
      {loadingCreate && <p>Loading Create</p>}
      {errorCreate && <p>{errorCreate}</p>}
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>short description</th>
              <th>logo</th>
              <th>background image</th>
              <th>thumbnail</th>
              <th>demo video</th>
              <th>difficulty</th>
              <th>price</th>
            </tr>
          </thead>
          <tbody>
            {formations?.map((formation) => {
              return (
                <tr key={formation._id}>
                  <td>{formation._id}</td>
                  <td>{formation.title}</td>
                  <td>{formation.shortDescription}</td>
                  <td>{formation.logo}</td>
                  <td>{formation.backgroundImage}</td>
                  <td>{formation.thumbnail}</td>
                  <td>{formation.demoVideo}</td>
                  <td>{formation.difficulty}</td>
                  <td>{formation.price}</td>
                  <td>
                    <a href={`mailto:${formation.email}`}>{formation.email}</a>
                  </td>

                  <td>
                    <Link to={`/admin/formations/${formation._id}/edit`}>
                      <button>Edit</button>
                    </Link>

                    <button onClick={() => deleteHandler(formation._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </>
  )
}

export default FormationList
