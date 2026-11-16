import { useState } from 'react';
import { createRoot } from 'react-dom/client';

function Starter() {
  const [status, setStatus] = useState('Ready');

  async function checkServer() {
    setStatus('Checking server…');

    try {
      const response = await fetch('/api/health');
      if (!response.ok || (await response.json()).ok !== true) {
        throw new Error('Health check failed');
      }
      setStatus('Server is responding');
    } catch {
      setStatus('Server is unavailable');
    }
  }

  return (
    <main>
      <h1>Room Booking Starter</h1>
      <button type="button" onClick={checkServer} disabled={status === 'Checking server…'}>
        Check server
      </button>
      <p role="status">{status}</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<Starter />);
