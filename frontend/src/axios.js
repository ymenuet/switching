import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:5050',
})

export default instance
