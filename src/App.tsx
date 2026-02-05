import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { ProfilePage } from './pages/ProfilePage'
import type { User } from './types/user'
import { LoginPage } from './pages/LoginPage'
import { ErrorPage } from './pages/ErrorPage'
import { ProtectedRouteForProfilePage } from './components/ProtectedRouteForProfilePage'
import { LoadingPage } from './pages/LoadingPage'
import api from './api/client'
import { useLoadingState } from './stores/loading.store'

function App() {
  const [userData, setUserData] = useState<User | null>(null)
  const isLoading = useLoadingState(state => state.isLoading)
  const setIsLoading = useLoadingState(state => state.setIsLoading)

  const fetchUserData = async () => {
    const res = await api.get<User>('/v1/users/1')
    setUserData(res.data)
  }

  useEffect(() => {
    const loadUserDate = async () => {
      setIsLoading(true)
      try {
        await fetchUserData()
      } catch (err) {
        console.log("Error happened during fetching user data: ", err)
      } finally {
        setIsLoading(false)
      }

    }
    loadUserDate()
  }, [])
  return (
    <>
    {isLoading && <LoadingPage />}
      <Routes>
        <Route index element={userData ? <HomePage user={userData} /> : null} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/error' element={<ErrorPage />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path='/profile' element={userData
          ?
          <ProtectedRouteForProfilePage>
            <ProfilePage user={userData} refreshUser={fetchUserData} />
          </ProtectedRouteForProfilePage>
          : null} />
      </Routes>
    </>

  )
}

export default App
