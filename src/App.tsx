import { useState } from 'react'
import './App.css'
import Luigi from './Luigi'
import { BrowserRouter, Route, Routes } from 'react-router'
import UserFormPage from './pages/userFormPage/userFormPage'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/avatar' element={<Luigi/>} />
      <Route path='/' element={<UserFormPage />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
