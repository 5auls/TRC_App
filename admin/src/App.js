import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Requests from './pages/Requests';
import Memberships from './pages/Memberships';
import Promos from './pages/Promos';
import Messages from './pages/Messages';

/*
 * Admin Console App
 *
 * This React app provides a simple navigation shell for the admin
 * console.  Each page is a stub that can be expanded to call the
 * backend API for listing and managing resources such as service
 * requests, membership plans, promotions and chat messages.  Use a
 * bundler like Vite or Create React App to compile this into a
 * production bundle.  This skeleton focuses on the component
 * structure rather than build configuration.
 */

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#f2f2f2' }}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '1rem' }}>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="/memberships">Memberships</Link></li>
          <li><Link to="/promos">Promos</Link></li>
          <li><Link to="/messages">Messages</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/memberships" element={<Memberships />} />
        <Route path="/promos" element={<Promos />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;