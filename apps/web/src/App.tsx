import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import PostPage from "./pages/PostPage"
import UserProfile from "./pages/UserProfile"
import CreatePostPage from "./pages/CreatePostPage"
import { useEffect, useState } from "react"
import { check, getMe, useAuthStore } from "@artylic/api-client"
import EditProfile from "./pages/EditProfile"
import Sidebar from "./components/sidebar_components/Sidebar"
import EditPost from "./pages/EditPost"
import SearchPage from "./pages/SearchPage"
import FollowPage from "./pages/FollowPage"
import LikedPosts from "./pages/LikedPosts"

function App() {
  
const { setAuth, clearAuth, token } = useAuthStore()
const [sidebarOpen, setSideBarOpen] = useState(false);
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
            setAuth(result.data.user, token)
        } else {
            clearAuth()
        }
        setLoading(false)
    }
    checkAuth()
}, [])

  return (
    <>
      <Header setSidebarOpen={() => setSideBarOpen(!sidebarOpen)}/>

      <div className="flex min-h-screen dark:bg-mist-900 text-black dark:text-white">
        <Sidebar isOpen={sidebarOpen}/>
        <div className="flex-1 pt-14">
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/post/:id" element={<PostPage/>}/>
                <Route path="/post/:id/edit" element={<EditPost/>}/>
                <Route path="/profile/:id" element={<UserProfile/>}/>
                <Route path="/profile/edit" element={<EditProfile/>}/>
                <Route path="/create" element={<CreatePostPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/follows" element={<FollowPage/>} />
                <Route path="/liked" element={<LikedPosts/>} />
            </Routes>
        </div>
        
      </div>
    </>
  )
}

export default App
