import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminRoute from './components/AdminRoute.jsx'

import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
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
import Developers from './pages/Developers.jsx'
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="home" redirect />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "daily",
        element: <ProtectedRoute element={<DailyGame />} />,
      },
      {
        path: "dictionary",
        element: <Dictionary />,
      },
      {
        path: "collections",
        element: <ProtectedRoute element={<PlantCollection />} />
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
    element: <AdminRoute element={<Admin />} />,
    children: [
      {
        index: true,
        element: <Navigate to="accounts" replace />,
      },
      {
        path: "accounts",
        element: <Accounts />,
      },
      {
        path: "plantshistory",
        element: <PlantsHistory />,
      },
      {
        path: "developers",
        element: <Developers />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
