import { useEffect, useState } from 'react'

import './App.css'
import Register from './Pages/register'
import Example from './Pages/toast'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Cookies from 'js-cookie';
import Login from './Pages/Login'
function App() {
  // const [token, setToken] = useState(null);


  const token = Cookies.get('token');
  console.log('tttkkn', token);


  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        {/* <Example /> */}
      </Routes>
    </>
  )
}

export default App
