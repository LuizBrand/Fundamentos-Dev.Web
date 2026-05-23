import { forwardRef } from 'react';

interface Props {
  valor: string;
  onChange: (v: string) => void;
}

const BarraBusca = forwardRef<HTMLInputElement, Props>(function BarraBusca(
  { valor, onChange },
  ref
) {
  return (
    <input
      ref={ref}
      type="text"
      className="campo-busca"
      placeholder="🔍 Buscar por nome..."
      value={valor}
      onChange={e => onChange(e.target.value)}
    />
  );
});

export default BarraBusca;
