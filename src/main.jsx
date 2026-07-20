import React from 'react';
import ReactDOM from 'react-dom/client';

// Geist is loaded via <link> in index.html (Google Fonts). The `geist`
// package is also installed if you prefer to self-host the font files.
import App from './App.jsx';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
