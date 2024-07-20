import React from 'react';

export default function TokenPane({ paneValue, setPaneValue }) {
  return (
    <div className="token-pane">
      <label htmlFor="token">Token</label>
      <input
        type="text"
        id="token"
        value={paneValue}
        onChange={(e) => setPaneValue(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter your token here"
      />
    </div>
  );
}
