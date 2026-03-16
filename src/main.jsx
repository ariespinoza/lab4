import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { SimpleForm } from './components/SimpleForm.jsx';
import Usuarios from './components/Usuarios.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Usuarios />
  </StrictMode>,
)
