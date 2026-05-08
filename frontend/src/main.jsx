import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router'

import App from './App.jsx'
import Dictionary from './pages/Dictionary.jsx' 
import PageNotFound from './pages/PageNotFound.jsx'
import PlantCollection from './pages/PlantCollection.jsx'
import PlantInformation from './pages/PlantInformation.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <App />,
      },
    ]
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
    path: "*",
    element: <PageNotFound />,
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
