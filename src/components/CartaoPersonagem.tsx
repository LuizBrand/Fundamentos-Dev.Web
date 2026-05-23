import { memo } from 'react';
import type { Personagem } from '../types/rickandmorty';
import { useFavoritos } from '../contexts/FavoritosContext';

const CartaoPersonagem = memo(function CartaoPersonagem({
  personagem,
}: {
  personagem: Personagem;
}) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const favorito = isFavorito(personagem.id);

  const classeBadge =
    personagem.status === 'Alive'
      ? 'badge-alive'
      : personagem.status === 'Dead'
        ? 'badge-dead'
        : 'badge-unknown';

  return (
    <div className={`card ${favorito ? 'card-favorito' : ''}`}>
      <button
        className="btn-favorito"
        onClick={() => toggleFavorito(personagem.id)}
        title={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {favorito ? '❤️' : '🤍'}
      </button>
      <img
        src={personagem.image}
        alt={personagem.name}
        className="card-img"
        loading="lazy"
      />
      <div className="card-body">
        <div className="card-nome">{personagem.name}</div>
        <div className="card-especie">{personagem.species}</div>
        <span className={`badge ${classeBadge}`}>{personagem.status}</span>
      </div>
    </div>
  );
});

export default CartaoPersonagem;
