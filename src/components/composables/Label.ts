import { LabelComponentPropsType } from '../../types';

function Label({ htmlFor, text, className }: LabelComponentPropsType) {
  const label = document.createElement('label');
  label.setAttribute('for', htmlFor);
  label.textContent = text;
  if (className) {
    label.className = className;
  }

  return label;
}

export default Label;
