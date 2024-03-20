import setAttributes from '../../utils/setAttributes';

type Props = {
  label?: {
    class?: string;
    for?: string;
  };
  text?: string;
};

export const Label = ({ label, text }: Props): HTMLElement => {
  const $label = document.createElement('label');
  $label.textContent = text ?? '';
  setAttributes($label, label);

  return $label;
};
