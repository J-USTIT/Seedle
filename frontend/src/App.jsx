import { useState } from 'react'

import LinkButton from './components/LinkButton.jsx'

import './App.css'

function App() {

  return (
    <>
      <h1 className="title">Seedle</h1>
      <LinkButton to="game">
        Play Game
      </LinkButton>      
      <LinkButton to="leaderboard">
        Leaderboard
      </LinkButton>      
      <LinkButton to="dictionary">
        Dictionary
      </LinkButton>
    </>
  )
}

export default App
