'use client';
import { useEffect, useState } from 'react';

type Ping = { ok: boolean; service: string; timestamp: string };

export default function Home() {
  const [ping, setPing] = useState<Ping | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const url = base ? `${base}/api/v1/ping` : '/api/v1/ping';
    fetch(url)
      .then(r => r.json())
      .then(setPing)
      .catch(() => setError('API offline'));
  }, []);

  return (
    <main style={{padding: 24, fontFamily: 'ui-sans-serif, system-ui'}}>
      <h1>Rowdz – Frontend Shell</h1>
      <p>Next.js 14 (SSG export). Configure <code>NEXT_PUBLIC_API_BASE_URL</code> para apontar pro ALB/API.</p>
      <div style={{marginTop: 16, padding: 12, border: '1px solid #ddd', borderRadius: 8}}>
        <strong>Status do backend:</strong>
        <pre>{JSON.stringify(ping ?? { error }, null, 2)}</pre>
      </div>
    </main>
  );
}