import React, { useEffect, useState } from 'react';

/*
 * Requests page
 *
 * Lists recent service requests submitted by customers and allows
 * operators to review and schedule them.  For now this component
 * fetches a list of requests from the stub backend and displays
 * them.  In a complete implementation operators could filter by
 * status, assign technicians and write internal notes.
 */

function Requests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:8000/requests');
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (err) {
        console.error('Failed to load requests', err);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Service Requests</h1>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>ID</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Category</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Description</th>
              <th style={{ borderBottom: '1px solid #ccc', textAlign: 'left' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td style={{ padding: '0.5rem 0' }}>{req.id}</td>
                <td>{req.category}</td>
                <td>{req.description}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Requests;