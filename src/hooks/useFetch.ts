import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [dados, setDados] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    setLoading(true);
    setErro(null);

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`Erro HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then(data => setDados(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setErro(err instanceof Error ? err.message : 'Erro desconhecido');
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [url]);

  return { dados, loading, erro };
}
