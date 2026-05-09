import { useState } from 'react'

import LinkButton from './components/LinkButton.jsx'

import './App.css'
import { Outlet } from 'react-router'
import NavigationBar from './components/NavigationBar.jsx'

function App() {

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
        <LinkButton to="login">
          Login
        </LinkButton>
        <LinkButton to="register">
          Register
        </LinkButton>
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
