import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Formations = () => {
  const [formations, setFormations] = useState([])
  useEffect(() => {
    const fetchFormations = async () => {
      const { data } = await axios.get('/api/formations')
      setFormations(data)
    }
    fetchFormations()
  }, [])
  return (
    <>
      <h1>formations</h1>
      <ul>
        <li>Fetch courses from mongoDB (only promotional stuff)</li>
        <li>Ability to view individual formation (popup or fake page)</li>
      </ul>
      <p>{JSON.stringify(formations)}</p>
    </>
  )
}

export default Formations
