import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import classes from '../../styles/Formations.module.css'

const Dashboard = () => {
  const [formations, setFormations] = useState([])
  const userLogin = useSelector((state: any) => state.userLogin)
  const { userInfo } = userLogin
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${userInfo.token}`,
    },
  }
  useEffect(() => {
    axios
      .get('/api/users/profile', config)
      .then((res: any) => setFormations(res.data.formations))
  }, [])
  useEffect(() => {
    console.log(formations)
  }, [formations])
  return (
    <div>
      <h1 className='py-4 text-center'>Mes cours</h1>
      <>
        {formations &&
          formations.map((formation: any) => {
            return <div className={classes.Formation}>{formation}</div>
          })}
      </>
    </div>
  )
}

export default Dashboard
