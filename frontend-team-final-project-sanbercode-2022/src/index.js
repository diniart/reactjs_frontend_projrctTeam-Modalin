import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Style/index.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
//import './Style/index.css'
import AppRoutes from './Routes/Routes'
import { UserProvider } from './Context/UserContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  </React.StrictMode>
);
