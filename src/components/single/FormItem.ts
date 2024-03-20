import setAttributes from '../../utils/setAttributes';
import { Label } from '../element/Label';

interface Props {
  label?: {
    class?: string;
    for?: string;
    text?: string;
  };
  element: HTMLElement;
  description?: string;
  required?: boolean;
}

export const FormItem = ({ label, element, description, required = false }: Props): HTMLElement => {
  const $formItem = document.createElement('div');
  $formItem.classList.add('form-item');

  const $label = Label({ label: label, text: label?.text });
  const $element = element;

  if (required) {
    $formItem.classList.add('form-item--required');
    $element.setAttribute('required', '');
  }

  $formItem.appendChild($label);
  $formItem.appendChild($element);

  if (description) {
    const $description = document.createElement('span');
    $description.classList.add('help-text', 'text-caption');
    $description.textContent = description;
    $formItem.appendChild($description);
  }

  return $formItem;
};
