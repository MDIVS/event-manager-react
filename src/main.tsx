import React from 'react'
import ReactDOM from 'react-dom/client'
import { EventName } from './EventName.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EventName> Nome do evento </EventName>
  </React.StrictMode>,
)
