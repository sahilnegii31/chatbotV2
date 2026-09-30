import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Starfield from './components/Starfield.jsx'
import Home from './pages/Home.jsx'
import Auth from './pages/Auth.jsx'
import Chat from './pages/Chat.jsx'



/**
 * App shell: starfield lives behind every route so the galaxy
 * theme stays consistent from landing to login to chat.
 */
function App() {
  return (
    <div className="relative min-h-svh overflow-x-hidden bg-void text-star">
      <Starfield />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth mode="login" />} />
        <Route path="/signup" element={<Auth mode="signup" />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
