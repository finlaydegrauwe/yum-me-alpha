import { useNavigate } from 'react-router'
import { useAuth } from '../contexts/Auth'

export function Dashboard() {
  const [username, setUsername] = useState(null)
  const { user, signOut } = useAuth()
  const history = useNavigate()

  async function handleSignOut() {
    await signOut()

    history('/login')
  }

  return (
    <div>
      <p>Welcome, {user?.id}!</p>
      
      <label>Allergenen</label>
        <input type="text" ref={ uhm } />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}