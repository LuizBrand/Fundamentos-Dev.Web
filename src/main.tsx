import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { FavoritosProvider } from './contexts/FavoritosContext';
import { TemaProvider } from './contexts/TemaContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TemaProvider>
      <FavoritosProvider>
        <App />
      </FavoritosProvider>
    </TemaProvider>
  </StrictMode>,
);
