
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Dynamically create the manifest object in the client.
const manifest = {
  url: window.location.origin,
  name: "Alternative Store",
  // This icon URL must be absolute and publicly accessible.
  iconUrl: "https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/a0a10c71-3a0e-4c7a-9c7b-7b567d022b3b.jpeg"
};

// Create a data URL from the manifest JSON. This is more robust than a blob URL
// as it can be used by external wallets (e.g., via QR code) because the content
// is embedded directly in the URL.
const manifestJson = JSON.stringify(manifest);
// Use unescape and encodeURIComponent for robust UTF-8 to Base64 encoding.
const manifestBase64 = btoa(unescape(encodeURIComponent(manifestJson)));
const manifestUrl = `data:application/json;base64,${manifestBase64}`;


const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);