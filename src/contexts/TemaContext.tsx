import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Tema = 'escuro' | 'claro';

interface TemaContextType {
  tema: Tema;
  toggleTema: () => void;
}

const TemaContext = createContext<TemaContextType | null>(null);

export function TemaProvider({ children }: { children: ReactNode }) {
  const [tema, setTema] = useLocalStorage<Tema>('rm-tema', 'escuro');

  useEffect(() => {
    document.documentElement.setAttribute('data-tema', tema);
  }, [tema]);

  function toggleTema() {
    setTema(prev => (prev === 'escuro' ? 'claro' : 'escuro'));
  }

  return (
    <TemaContext.Provider value={{ tema, toggleTema }}>
      {children}
    </TemaContext.Provider>
  );
}

export function useTema() {
  const ctx = useContext(TemaContext);
  if (!ctx) throw new Error('useTema deve ser usado dentro de TemaProvider');
  return ctx;
}
