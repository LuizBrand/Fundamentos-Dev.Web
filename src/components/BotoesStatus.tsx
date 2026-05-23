import { memo } from 'react';
import type { FiltroStatus } from '../types/rickandmorty';

interface Props {
  filtroAtivo: FiltroStatus;
  onChange: (status: FiltroStatus) => void;
}

const BotoesStatus = memo(function BotoesStatus({ filtroAtivo, onChange }: Props) {
  return (
    <div className="filtros">
      {(['all', 'alive', 'dead', 'unknown'] as FiltroStatus[]).map(s => (
        <button
          key={s}
          className={`btn-filtro ${s} ${filtroAtivo === s ? 'ativo' : ''}`}
          onClick={() => onChange(s)}
        >
          {s === 'all' ? 'Todos' : s.charAt(0).toUpperCase() + s.slice(1)}
        </button>
      ))}
    </div>
  );
});

export default BotoesStatus;
