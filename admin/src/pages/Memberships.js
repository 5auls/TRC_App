import React, { useEffect, useState } from 'react';

/*
 * Memberships page
 *
 * Allows operators to view and manage customer memberships.  This
 * stub fetches the current user's membership only for demonstration
 * purposes.  In a full implementation, the backend would expose
 * membership lists and allow creating or modifying plans.
 */

function Memberships() {
  const [membership, setMembership] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:8000/membership');
        if (res.ok) {
          setMembership(await res.json());
        }
      } catch (err) {
        console.error('Failed to load membership', err);
      }
    }
    load();
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Memberships</h1>
      {membership ? (
        <div>
          <p>Plan: {membership.plan}</p>
          <p>Status: {membership.status}</p>
          <p>Renews: {membership.renews_at && new Date(membership.renews_at).toLocaleDateString()}</p>
        </div>
      ) : (
        <p>Loading membership information...</p>
      )}
      <p>
        In the full admin console, this section will list all member
        subscriptions, allow editing benefits and pricing, and enable
        renewals or cancellations.
      </p>
    </div>
  );
}

export default Memberships;