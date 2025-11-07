
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Dynamically create the manifest object in the client.
// This solves two problems:
// 1. It avoids the "new URL()" constructor error with relative paths.
// 2. It ensures the `url` field in the manifest always matches the
//    current app's origin, which is required by TonConnect for security.
const manifest = {
  url: window.location.origin,
  name: "Alternative Store",
  // This icon URL must be absolute and publicly accessible.
  iconUrl: "https://storage.googleapis.com/aistudio-hosting/workspace-assets/original/a0a10c71-3a0e-4c7a-9c7b-7b567d022b3b.jpeg"
};

// Create a blob from the manifest JSON.
const manifestBlob = new Blob([JSON.stringify(manifest)], { type: 'application/json' });
// Create a URL for the blob.
const manifestUrl = URL.createObjectURL(manifestBlob);

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);