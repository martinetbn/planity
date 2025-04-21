import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/tailwind.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="font-bold text-xl">test</div>
  </StrictMode>,
);
