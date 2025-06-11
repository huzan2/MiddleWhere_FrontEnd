// src/main.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { CookiesProvider } from 'react-cookie';
import { RecoilRoot } from 'recoil';

createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <CookiesProvider>
      <App />
    </CookiesProvider>
  </RecoilRoot>,
);
