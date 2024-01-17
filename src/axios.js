import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://estore-q7r3.onrender.com/api/v1',
  timeout: 5000,
  withCredentials: true,
})

export default instance
