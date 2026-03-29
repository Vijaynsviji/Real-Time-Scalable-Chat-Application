import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import './App.css'

import Home from './components/home/home';
import SignIn from './components/auth/signin';
import SignUp from './components/auth/signup';
import ProfileComp from './components/home/sidebar/profile/profile';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {



  const router = createHashRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signin",
    element: <SignIn />
  },
    {
    path: "/signup",
    element: <SignUp/>
  },
  {
    path: '/profile',
    element: <ProfileComp />
  }
  ]);


  return (
    <>
    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>
    
    </>
  )
}

export default App
