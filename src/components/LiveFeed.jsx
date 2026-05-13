import React, { useState, useEffect } from 'react';

const LiveFeed = () => {
  const [logs, setLogs] = useState([
    "[SYSTEM]: Dizvyn-Core initialization complete.",
    "[DATA]: Scanning local nodes...",
    "[STATUS]: Firewalls active."
  ]);

  const messages = [
    "[SYSTEM]: Connection established.",
    "[RENDER]: New UI component optimized.",
    "[NOVA]: Ready for next project.",
    "[DEBUG]: Latency 0.02ms detected.",
    "[SECURITY]: AES-256 encryption active."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(prev => [...prev.slice(-3), messages[Math.floor(Math.random() * messages.length)]]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: 'rgba(5, 5, 5, 0.4)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(0, 243, 255, 0.1)',
      borderRadius: '8px',
      padding: '12px 16px',
      width: 'fit-content',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    }}>
      <div style={{
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: '10px',
        color: '#00f3ff',
        opacity: 0.7,
        lineHeight: '1.8',
        textShadow: '0 0 5px rgba(0, 243, 255, 0.2)'
      }}>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;