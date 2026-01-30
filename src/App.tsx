import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import type { User } from './types/user'
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import api from './api/client'

function App() {
  const [userData, setUserData] = useState<User | null>(null)


  const fetchUserData = async () => {
    const res = await api.get<User>('/v1/users/1')
    setUserData(res.data)
  }

  useEffect(() => {
    const loadUserDate = async () => {
      await fetchUserData()
    }
    loadUserDate()
  }, [])

  return (
    <Routes>
      <Route index element={userData ? <HomePage user={userData} /> : null} />
      <Route path="/login" element={<LoginPage />} />
      <Route path='/error' element={<ErrorPage />} />
      <Route path='/profile' element={userData ? <ProfilePage user={userData} refreshUser={fetchUserData}/> : null} />
    </Routes>
  )
}

export default App
