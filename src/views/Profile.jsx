import { useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import axios from '../axios'
import NavbarItem from '../components/NavbarItem'

const Profile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post('/logout', null, { withCredentials: true })
      dispatch(logout())
      localStorage.removeItem('isLoggedIn')
      toast.success('Logout success')
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div>
      <button className="" onClick={handleLogout}>
        Logout
      </button>

      <NavbarItem to="/login">Login</NavbarItem>
    </div>
  )
}

export default Profile
