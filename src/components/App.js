import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Signup } from './Signup'
import { Dashboard } from './Dashboard'
import { AuthProvider } from '../contexts/Auth'
import { Login } from './Login'
import { PrivateRoute } from './PrivateRoute'
import './App.css';

export default function App() {
  return (
    <div>
      <h1 id='title'>Yum-me</h1>
      <Router>
        <AuthProvider>
          <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Dashboard/>}/>
          </Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}