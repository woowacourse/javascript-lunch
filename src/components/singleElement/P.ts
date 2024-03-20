import setAttributes from '../../utils/setAttributes';

interface Props {
  p?: {
    class?: string;
  };
  text: string;
}

export const P = ({ p, text }: Props): HTMLParagraphElement => {
  const $p = document.createElement('p');
  $p.textContent = text;
  setAttributes($p, p);

  return $p;
};
