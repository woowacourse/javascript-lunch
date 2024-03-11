import { LabelComponentPropsType } from '../../types/components';

function Label({ htmlFor, text, className }: LabelComponentPropsType) {
  const label = Object.assign(document.createElement('label'), {
    textContent: text,
    className,
    htmlFor,
  });

  return label;
}

export default Label;
