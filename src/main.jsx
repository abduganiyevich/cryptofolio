import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WatchlistProvider } from './components/WatchlistContext/WatchlistContext.jsx';

import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <WatchlistProvider>
     <App />
  </WatchlistProvider>
  </BrowserRouter>,
)
