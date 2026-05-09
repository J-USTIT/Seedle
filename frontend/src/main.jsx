import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router'

import App from './App.jsx'
import Dictionary from './pages/Dictionary.jsx' 
import PageNotFound from './pages/PageNotFound.jsx'
import PlantCollection from './pages/PlantCollection.jsx'
import PlantInformation from './pages/PlantInformation.jsx'
import Leaderboards from './pages/Leaderboards.jsx'
import DailyGame from './pages/DailyGame.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Admin from './pages/Admin.jsx'
import Accounts from './pages/Accounts.jsx'
import Home from './pages/Home.jsx'
import PlantsHistory from './pages/PlantsHistory.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="home" redirect/>,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "daily",
        element: <DailyGame />,
      },
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      {
        path: "collections",
        element: <PlantCollection />
      },
      {
        path: "plant/:id",
        element: <PlantInformation />
      },
      {
        path: "leaderboard",
        element: <Leaderboards />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "register",
        element: <Register />
      },
    ]
  },
  {
    path: "admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Navigate to="accounts" replace/>,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "plantshistory",
        element: <PlantsHistory />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
