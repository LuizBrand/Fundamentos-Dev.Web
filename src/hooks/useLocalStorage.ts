import { useState } from 'react';

export function useLocalStorage<T>(chave: string, valorInicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const item = localStorage.getItem(chave);
      return item ? (JSON.parse(item) as T) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  function setValorEPersistir(novoValor: T | ((prev: T) => T)) {
    setValor(prev => {
      const resultado =
        typeof novoValor === 'function'
          ? (novoValor as (prev: T) => T)(prev)
          : novoValor;
      localStorage.setItem(chave, JSON.stringify(resultado));
      return resultado;
    });
  }

  return [valor, setValorEPersistir] as const;
}
