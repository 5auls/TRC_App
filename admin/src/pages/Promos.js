import React, { useEffect, useState } from 'react';

/*
 * Promotions page
 *
 * Lists existing promotions and provides a form to create new ones.  The
 * stub backend returns a static array of promotions; a real API
 * would persist new promotions.  Here we collect new promo data from
 * the form and simply append it to local state for demonstration.
 */

function Promos() {
  const [promos, setPromos] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('http://localhost:8000/promos');
        if (res.ok) {
          const data = await res.json();
          setPromos(data);
        }
      } catch (err) {
        console.error('Failed to load promotions', err);
      }
    }
    load();
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    const newPromo = {
      id: Date.now(),
      title,
      body,
      target_segment: 'all',
    };
    setPromos((prev) => [...prev, newPromo]);
    setTitle('');
    setBody('');
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Promotions</h1>
      {promos.length === 0 ? (
        <p>No promotions available.</p>
      ) : (
        <ul>
          {promos.map((promo) => (
            <li key={promo.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{promo.title}</strong>: {promo.body}
            </li>
          ))}
        </ul>
      )}
      <h2>Create Promotion</h2>
      <form onSubmit={handleCreate} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <label htmlFor="body" style={{ display: 'block', marginBottom: '0.25rem' }}>
            Body
          </label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default Promos;