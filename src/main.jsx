import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import PokemonDetails from './routes/PokemonDetails' // O vom crea imediat
import './index.css'
import About from './About'

// config routes using HashRouter (#)
const router = createHashRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetails />,
  },
  {
    path: "/about", 
    element: <About />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)