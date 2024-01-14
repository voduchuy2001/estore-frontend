import axios from '../axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { login } from '../redux/userSlice'

const CallbackGoogle = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`/callback/auth-google/${location.search}`, {
        withCredentials: true,
      })
      .then((response) => {
        toast.success(response.data.message)
        dispatch(login(response.data))
        setTimeout(() => {
          navigate('/')
        }, 1000)
      })
  })

  return <div>Call back</div>
}

export default CallbackGoogle
