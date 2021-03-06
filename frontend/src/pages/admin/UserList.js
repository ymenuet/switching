import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, deleteUser } from '../../actions/userActions'
import { Link } from 'react-router-dom'

const UserList = (props) => {
  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(listUsers())
    } else {
      props.history.push('/login')
    }
    dispatch(listUsers())
  }, [dispatch, props.history, successDelete, userInfo])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteUser(id))
    }
  }

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <h2>Loading</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>email</th>
              <th>admin</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.isAdmin ? 'yes ' : 'x'}</td>
                  <td>
                    <Link to={`/admin/users/${user._id}/edit`}>
                      <button>Edit</button>
                    </Link>

                    <button onClick={() => deleteHandler(user._id)}>
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

export default UserList
