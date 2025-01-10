import React, { useState } from 'react';
import Navbar from './components/navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  return (
    <React.Fragment>
      <Navbar
        showDropdown={showUserDropdown}
        setShowDropdown={setShowUserDropdown}
      />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;
