import setAttributes from '../../utils/setAttributes';

interface Props {
  h3?: {
    class?: string;
  };
  text: string;
}

export const H3 = ({ h3, text }: Props): HTMLElement => {
  const $h3 = document.createElement('h2');
  $h3.textContent = text;
  setAttributes($h3, h3);

  return $h3;
};
