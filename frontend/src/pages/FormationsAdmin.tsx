import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listFormations } from '../actions/formationActions'
import { Link } from 'react-router-dom'

const FormationList = (props: any) => {
  const dispatch = useDispatch()

  const formationList = useSelector((state: any) => state.formationList)
  const { loading, error, formations } = formationList

  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listFormations())
    } else {
      props.history.push('/login')
    }
    dispatch(listFormations())
  }, [dispatch, props.history, userInfo])

  const deleteHandler = (id: any) => {
    if (window.confirm('Are you sure?')) {
      // DELETE FORMATION
    }
  }

  const createFormationHandler = () => {
    console.log('creating formation')
  }

  return (
    <>
      <h1>Formations</h1>
      <button onClick={createFormationHandler}>Create a formation</button>

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
            {formations?.map((formation: any) => {
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
                    <Link>
                      <button onClick={() => deleteHandler(formation._id)}>
                        Delete
                      </button>
                    </Link>
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
