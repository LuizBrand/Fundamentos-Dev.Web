import { useFavoritos } from '../contexts/FavoritosContext';
import { useFetch } from '../hooks/useFetch';
import CartaoPersonagem from './CartaoPersonagem';
import type { Personagem } from '../types/rickandmorty';

function FavoritosTab() {
  const { favoritos } = useFavoritos();

  const url =
    favoritos.length > 0
      ? `https://rickandmortyapi.com/api/character/${favoritos.join(',')}`
      : '';

  const { dados, loading, erro } = useFetch<Personagem | Personagem[]>(url);

  if (favoritos.length === 0) {
    return <p className="vazio">Você ainda não favoritou nenhum personagem. Clique em 🤍 nos cards!</p>;
  }

  const personagens: Personagem[] = dados
    ? Array.isArray(dados)
      ? dados
      : [dados]
    : [];

  return (
    <div>
      {loading && <p className="status loading">⏳ Carregando favoritos...</p>}
      {erro && <p className="status erro">❌ {erro}</p>}
      {!loading && !erro && (
        <div className="grid">
          {personagens.map(p => (
            <CartaoPersonagem key={p.id} personagem={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritosTab;
