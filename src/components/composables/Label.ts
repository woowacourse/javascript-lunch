import { LabelComponentPropsType } from '../../types/components';

function Label({ htmlFor, text, className }: LabelComponentPropsType) {
  const label = document.createElement('label');
  label.setAttribute('for', htmlFor);
  label.textContent = text;
  label.className = className ?? '';

  return label;
}

export default Label;
