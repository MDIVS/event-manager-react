import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { App } from './App.tsx'
import { Home } from './routes/home.tsx';
import { SignUp } from './routes/sign-up.tsx';

import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/sign-up',
        element: <SignUp/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
