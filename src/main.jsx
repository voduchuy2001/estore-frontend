import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from "./redux/index";
import { Provider } from "react-redux";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './views/Home.jsx'
import Shop from './views/Shop.jsx'
import About from './views/About.jsx'
import Contact from './views/Contact.jsx'
import Login from './views/Login.jsx'
import Register from './views/Register.jsx'
import Profile from './views/Profile.jsx';
import NewProduct from './views/NewProduct.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import CartList from './views/CartList.jsx';
import Checkout from './views/Checkout.jsx';
import CallBackVNPay from './views/CallBackVNPay.jsx';

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
      <Route path="new-product" element={ <NewProduct /> } />
      <Route path="list-item" element={ <CartList />} />
      <Route path="checkout" element={ <Checkout /> } />
      <Route path="callback-vnpay" element={ <CallBackVNPay /> } />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router} />
     </PersistGate>
  </Provider>
)