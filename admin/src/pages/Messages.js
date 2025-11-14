import React, { useEffect, useState } from 'react';

/*
 * Messages page
 *
 * Displays chat threads for operator replies.  In this stub we fetch
 * messages for a single job (hardcoded) and allow the operator to
 * send replies.  A real implementation would list all active
 * conversations and route messages to the appropriate job thread.
 */

function Messages() {
  const jobId = 101;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`http://localhost:8000/messages?job_id=${jobId}`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (err) {
        console.error('Failed to load messages', err);
      }
    }
    // The stub API does not support this endpoint yet, so messages
    // will be empty.  We'll populate via local state when sending.
    load();
  }, [jobId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const message = {
      job_id: jobId,
      sender: 'staff',
      text: input.trim(),
      media: [],
    };
    try {
      const res = await fetch('http://localhost:8000/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      });
      if (res.ok) {
        const saved = await res.json();
        setMessages((prev) => [...prev, saved]);
        setInput('');
      }
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Messages</h1>
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0.5rem',
          height: '300px',
          overflowY: 'auto',
          marginBottom: '1rem',
        }}
      >
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '0.5rem',
                textAlign: msg.sender === 'staff' ? 'right' : 'left',
              }}
            >
              <small>{msg.sender}</small>
              <p
                style={{
                  display: 'inline-block',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  backgroundColor: msg.sender === 'staff' ? '#d1e8ff' : '#f0f0f0',
                  maxWidth: '70%',
                }}
              >
                {msg.text}
              </p>
            </div>
          ))
        )}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1 }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Messages;