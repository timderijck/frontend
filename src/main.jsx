import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.jsx'

// Dit is het startpunt van de hele website.
// Hier wordt de React-applicatie gekoppeld aan het HTML-bestand.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
