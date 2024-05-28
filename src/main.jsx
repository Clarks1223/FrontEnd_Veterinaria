import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
//Se quita el <React.StrictMode></React.StrictMode> que envuelve APP
//Se debe habilitar cuando se suba a produccion

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
