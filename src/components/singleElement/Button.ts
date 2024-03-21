import setAttributes from '../../utils/setAttributes';

interface Props {
  button: {
    class?: string;
    type?: string;
    onclick?: () => void;
  };
  text?: string;
}

export const Button = ({ button, text }: Props): HTMLElement => {
  const $button = document.createElement('button');
  $button.textContent = text ?? '';
  setAttributes($button, button);

  return $button;
};
