import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import PostPage from "./pages/PostPage"
import UserProfile from "./pages/UserProfile"
import CreatePostPage from "./pages/CreatePostPage"
import { useEffect, useState } from "react"
import { check, getMe, useAuthStore } from "@artylic/api-client"

function App() {
  
const { setAuth, clearAuth, token } = useAuthStore()
const [loading, setLoading] = useState(true)

useEffect(() => {
    async function handleOAuthRedirect() {
        const params = new URLSearchParams(window.location.search)
        const token = params.get('token')
        
        if (token) {
            const result = await getMe(token)
            if (result.success && result.data) {
                setAuth(result.data, token)
            }
            window.history.replaceState({}, '', '/')  // clean url
        }
    }
    handleOAuthRedirect()
}, [])

useEffect(() => {
    async function checkAuth() {
        if (!token) {
            setLoading(false)
            return
        }
        const result = await check()
        if (result.success && result.data) {
            setAuth(result.data.user, result.data.token)
        } else {
            clearAuth()
        }
        setLoading(false)
    }
    checkAuth()
}, [])

  return (
    <>

      <Header/>

      <div className="pt-18 min-h-screen dark:bg-mist-900 text-black dark:text-white">

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/post" element={<PostPage/>}/>
          <Route path="/profile/:id" element={<UserProfile/>}/>
          <Route path="/create" element={<CreatePostPage/>}/>
        </Routes>
        
      </div>
    </>
  )
}

export default App
