import { Dashboard } from './components/Dashboard.jsx'
import {Login} from './components/Login.jsx'
import {Signup} from './components/Signup.jsx'

import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { Conwallet } from './components/Conwallet.jsx'

function App() {
  

  return (
    <BrowserRouter>
    <ToastContainer position='top-center'></ToastContainer>
    <Routes>
      <Route path='/'element={<Dashboard></Dashboard>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/signup' element={<Signup></Signup>}></Route>
      <Route path='/conwallet' element={<Conwallet></Conwallet>}></Route>
      </Routes>
      </BrowserRouter>
  )
}

export default App
