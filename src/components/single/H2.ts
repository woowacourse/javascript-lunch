import setAttributes from '../../utils/setAttributes';

interface Props {
  h2?: {
    class?: string;
  };
  text: string;
}

export const createH2 = ({ h2, text }: Props): HTMLElement => {
  const $h2 = document.createElement('h2');
  $h2.textContent = text;
  setAttributes($h2, h2);

  return $h2;
};
