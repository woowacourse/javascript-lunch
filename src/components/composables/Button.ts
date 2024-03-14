import { ButtonComponentProps } from '../../types/components';

/* eslint-disable max-lines-per-function */
function Button({
  type = 'button',
  className,
  text,
  id,
  value,
  role,
  ariaLabel,
}: ButtonComponentProps): HTMLButtonElement {
  const button = Object.assign(document.createElement('button'), {
    type,
    className,
    textContent: text,
    id,
    value,
    role,
    ariaLabel,
  });

  return button;
}

export default Button;
