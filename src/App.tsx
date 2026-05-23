import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { useFetch } from './hooks/useFetch';
import { useDebounce } from './hooks/useDebounce';
import { useFavoritos } from './contexts/FavoritosContext';
import { useTema } from './contexts/TemaContext';
import CartaoPersonagem from './components/CartaoPersonagem';
import BarraBusca from './components/BarraBusca';
import BotoesStatus from './components/BotoesStatus';
import Paginacao from './components/Paginacao';
import FavoritosTab from './components/FavoritosTab';
import type { RespostaAPI, FiltroStatus } from './types/rickandmorty';
import './App.css';
function App() {
  const [pagina, setPagina] = useState(1);
  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>('all');
  const [aba, setAba] = useState<'todos' | 'favoritos'>('todos');
  const { totalFavoritos } = useFavoritos();
  const { tema, toggleTema } = useTema();
  const buscaDebounced = useDebounce(busca, 400);
  const inputRef = useRef<HTMLInputElement>(null);
  const sp = filtroStatus !== 'all' ? `&status=${filtroStatus}` : '';
  const { dados, loading, erro } = useFetch<RespostaAPI>(`https://rickandmortyapi.com/api/character?page=${pagina}${sp}`);
  const filtrados = useMemo(() => (dados?.results ?? []).filter(p => p.name.toLowerCase().includes(buscaDebounced.toLowerCase())), [dados, buscaDebounced]);
  const mudarFiltro = useCallback((s: FiltroStatus) => { setFiltroStatus(s); setPagina(1); }, []);
  useEffect(() => { inputRef.current?.focus(); }, [filtroStatus]);
  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>🧬 Painel de Personagens</h1>
          <p className="subtitulo">Dados consumidos da Rick and Morty API</p>
        </div>
        <div className="header-acoes">
          {totalFavoritos > 0 && <span className="contador">❤️ {totalFavoritos}</span>}
          {dados && <span className="contador">{dados.info.count} personagens</span>}
          <button className="btn-tema" onClick={toggleTema}>{tema === 'escuro' ? '☀️' : '🌙'}</button>
        </div>
      </header>
      <div className="abas">
        <button className={`aba ${aba === 'todos' ? 'ativa' : ''}`} onClick={() => setAba('todos')}>Todos</button>
        <button className={`aba ${aba === 'favoritos' ? 'ativa' : ''}`} onClick={() => setAba('favoritos')}>Favoritos{totalFavoritos > 0 ? ` (${totalFavoritos})` : ''}</button>
      </div>
      {aba === 'favoritos' ? <FavoritosTab /> : <>
        <div className="controles">
          <BarraBusca ref={inputRef} valor={busca} onChange={setBusca} />
          <BotoesStatus filtroAtivo={filtroStatus} onChange={mudarFiltro} />
        </div>
        {loading && <p className="status loading">⏳ Carregando personagens...</p>}
        {erro && <p className="status erro">❌ {erro}</p>}
        {!loading && !erro && <div className="grid">
          {filtrados.length > 0 ? filtrados.map(p => <CartaoPersonagem key={p.id} personagem={p} />) : <p className="vazio">Nenhum personagem encontrado.</p>}
        </div>}
        {dados?.info && !loading && <Paginacao info={dados.info} pagina={pagina} onAnterior={() => setPagina(p => p - 1)} onProxima={() => setPagina(p => p + 1)} />}
      </>}
    </div>
  );
}
export default App;
