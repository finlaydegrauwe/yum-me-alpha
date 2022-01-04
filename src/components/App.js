import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { Login } from './Login'
import { PrivateRoute } from './PrivateRoute'
import './App.css';
import Party from './Party'
import { useState } from 'react'


export default function App() {
  const [partyUrl,setPartyUrl] = useState('')

  return (
    <div>
      <Router>
      <Link style={{ textDecoration: 'none', color:'white' }} to={'/'}><h1 id='title'>Yum-me</h1></Link>
        <AuthProvider>
          <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Dashboard partyUrl={partyUrl} setPartyUrl={setPartyUrl}/>}/>
          </Route>
          {/* todo: party-url */}
            <Route path="event/:eventId" element={<Party />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}