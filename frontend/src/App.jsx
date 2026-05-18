import { useNavigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext.jsx'
import LinkButton from './components/LinkButton.jsx'

import './App.css'
import { Outlet } from 'react-router-dom'
import NavigationBar from './components/NavigationBar.jsx'

function App() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <NavigationBar>
        <LinkButton to="daily">
          Play Game
        </LinkButton>      
        <LinkButton to="leaderboard">
          Leaderboard
        </LinkButton>      
        <LinkButton to="collections">
          Plant Collection
        </LinkButton>      
        <LinkButton to="dictionary">
          Dictionary
        </LinkButton>
        {!isAuthenticated && (
          <>
            <LinkButton to="login">
              Login
            </LinkButton>
            <LinkButton to="register">
              Register
            </LinkButton>
          </>
        )}
        {isAuthenticated && (
          <>
            <span className="inline-block px-5 py-2.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              Hi, {user?.username}
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-block px-5 py-2.5 rounded-full bg-red-100 text-red-700 font-medium hover:bg-red-200 transition-all"
            >
              Logout
            </button>
          </>
        )}
        <LinkButton to="admin">
          Admin
        </LinkButton>
      </NavigationBar>
      <div>
        <Outlet />
      </div>
    </>
  )
}

export default App
