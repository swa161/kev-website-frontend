import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { LoggedInPage } from './pages/LoggedInPage'
import axios from 'axios'
import type { User } from './types/user'
import { LoginPage } from './pages/LoginPage'


function App() {
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get<User>('/api/v1/users/1')
      setUserData(response.data)
    }
    fetchUserData()
  }, [])
  return (
    <Routes>
      <Route index element={userData ?<HomePage user={userData}/> : null}/>
      <Route path="/login" element={<LoginPage />} />
      <Route  path='/profile' element={userData ? <LoggedInPage user={userData} /> : null}/>
    </Routes>
  )
}

export default App
