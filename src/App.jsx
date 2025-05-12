import React from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Chat from './components/pages/Chat'
import { Toaster } from 'react-hot-toast'
import SetAvatar from './components/setAvatar'


const router=createBrowserRouter(
  [
      {
        path:'/',
        element: <div>
          <Chat/>
        </div>
      },
    {
      path:'/register',
      element: <div>
        <Register/>
      </div>
    },
    {
      path:'/login',
      element: <div>
        <Login/>
      </div>
    },
    {
      path:'/setAvatar',
      element: <div>
        <SetAvatar/>
      </div>
    },
  ]
)    

const App = () => {
  return (
      <div>
        <Toaster/>
      <RouterProvider router={router} />
      </div>
  )
}

export default App
