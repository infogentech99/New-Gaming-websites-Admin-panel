import React from 'react';
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import CreateUser from './Model/CreateUser';
import UserLogin from './components/UserLogin';


function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AdminLogin/>,
    },
    {
      path: "/Login",
      element: <UserLogin/>,
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard/>,
    },
    {
      path: "/create-user",
      element: <CreateUser/>,
    },
  ]);

  return (
    <RouterProvider router={appRouter}>
    </RouterProvider>
  );
}

export default App;

