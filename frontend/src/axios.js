import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:3343',
})

export default instance
