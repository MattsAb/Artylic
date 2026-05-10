import { Route, Routes } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Header from "./components/Header"
import PostPage from "./pages/PostPage"
import UserProfile from "./pages/UserProfile"
import CreatePostPage from "./pages/CreatePostPage"

function App() {

  return (
    <>

      <Header/>

      <div className="pt-18 min-h-screen dark:bg-mist-900 text-black dark:text-white">

        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/post" element={<PostPage/>}/>
          <Route path="/profile" element={<UserProfile/>}/>
          <Route path="/create" element={<CreatePostPage/>}/>
        </Routes>
        
      </div>
    </>
  )
}

export default App
