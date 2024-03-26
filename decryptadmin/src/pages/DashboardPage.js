import React from 'react';

import Dashboard from '../components/Dashboard/Dashboard';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const DashboardPage = () => {
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
