import { Toaster } from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './global/components/Layout/Layout.jsx';
import Home from './global/components/Home/Home.jsx';
import FindJobs from './global/components/FindJobs/FindJobs.jsx';
import Employers from './global/components/Employers/Employers.jsx';
import Signup from './global/components/Signup/Signup.jsx';
import Login from './global/components/Login/Login.jsx';
import User from './global/components/Client/User.jsx';
import { useEffect, useState } from 'react';
import Hr from './global/components/Client/Hr.jsx';
import ProtectedRouter from './global/components/ProtectedRouter/ProtectedRouter.jsx';

function App() {
  const [userDataToken, setUserDataToken] = useState("");

  const saveUserDecodedToken = () => {
    if (localStorage.getItem("userToken") !== null) {
      const userDecodedToken = localStorage.getItem("userToken");
      const x = jwtDecode(userDecodedToken);
      setUserDataToken(x);
    }
  }

  useEffect(() => {
    saveUserDecodedToken();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout userDataToken={userDataToken} />,
      children: [
        { index: true, element: <Home /> },
        { path: "findJobs", element: <FindJobs /> },
        { path: "employers", element: <Employers /> },
        { path: "signup", element: <Signup /> },
        // Pass userDataToken as a prop to the Login component
        { path: "login", element: <Login /> },
        { path: "profile", element: <ProtectedRouter userDataToken={userDataToken} userChild={<User/>} hrChild={<Hr userDataToken={userDataToken} />}></ProtectedRouter> },
      ]
    }
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router}>
      </RouterProvider>
    </>
  );
}

export default App;
