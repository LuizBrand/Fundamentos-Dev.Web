import type { Personagem } from '../types/rickandmorty';

// MISSÃO 1: Defina a interface de Props para este componente.
// O componente deve receber um objeto 'personagem: Personagem'
// e opcionalmente uma função 'onClick?: () => void'
interface Props {
    personagem: Personagem;
    onClick?: () => void;
}

function CartaoPersonagem({ personagem, onClick }: Props) {
    // MISSÃO 2: Implemente a lógica para a classe CSS do badge.
    // status "Alive"   → classe "badge-alive"
    // status "Dead"    → classe "badge-dead"
    // status "unknown" → classe "badge-unknown"
    const classeBadge =
        personagem.status === 'Alive'
            ? 'badge-alive'
            : personagem.status === 'Dead'
                ? 'badge-dead'
                : 'badge-unknown';

    return (
        <div className="card" onClick={onClick}>
            <img
                src={personagem.image}
                alt={personagem.name}
                className="card-img"
                loading="lazy"
            />
            <div className="card-body">
                {/* MISSÃO 3: Complete o JSX do card
            - Exiba personagem.name com a classe "card-nome"
            - Exiba personagem.species com a classe "card-especie"
            - Exiba um <span> com o badge de status
        */}
                <div className="card-nome">{personagem.name}</div>
                <div className="card-especie">{personagem.species}</div>
                <span className={`badge ${classeBadge}`}>{personagem.status}</span>
            </div>
        </div>
    );
}

export default CartaoPersonagem;
