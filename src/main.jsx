import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from "./redux/index";
import { Provider } from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './views/Home.jsx'
import Shop from './views/Shop.jsx'
import About from './views/About.jsx'
import Contact from './views/Contact.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Profile from './views/Profile.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={ <App /> }>
      <Route index element={ <Home /> }/>
      <Route path='shop' element={ <Shop /> }/>
      <Route path='about' element={ <About /> }/>
      <Route path='contact' element={ <Contact /> }/>
      <Route path='login' element={ <Login /> }/>
      <Route path='register' element={ <Register /> }/>
      <Route path='profile' element={ <Profile /> }/>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)