import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Footer from '../Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';


const Layout = ({ userDataToken }) => (
  <div>
    <Navbar userDataToken={userDataToken} />
    <Outlet></Outlet>
    <Footer />
  </div>
);


export default Layout;
