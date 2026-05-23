import type { ApiInfo } from '../types/rickandmorty';

interface Props {
  info: ApiInfo;
  pagina: number;
  onAnterior: () => void;
  onProxima: () => void;
}

function Paginacao({ info, pagina, onAnterior, onProxima }: Props) {
  return (
    <div className="paginacao">
      <span className="pag-info">
        {info.count} personagens · Página {pagina} de {info.pages}
      </span>
      <div className="pag-botoes">
        <button className="btn-pag" disabled={!info.prev} onClick={onAnterior}>
          ← Anterior
        </button>
        <button
          className={`btn-pag ${info.next ? 'proximo' : ''}`}
          disabled={!info.next}
          onClick={onProxima}
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

export default Paginacao;
