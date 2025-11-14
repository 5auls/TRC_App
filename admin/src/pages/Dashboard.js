import React from 'react';

/*
 * Dashboard page
 *
 * Displays a high‑level overview of activity within the admin console.
 * In a full implementation this would call APIs to show metrics such
 * as the number of open requests, upcoming visits, outstanding invoices
 * and new chat messages.  Here we simply render static text as a
 * placeholder.
 */

function Dashboard() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Admin Dashboard</h1>
      <p>This dashboard will show a summary of recent activity.</p>
    </div>
  );
}

export default Dashboard;