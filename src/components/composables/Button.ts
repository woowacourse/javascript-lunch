import { ButtonComponentProps } from '../../types/components';

function Button({ type = 'button', className, text, id, value, role }: ButtonComponentProps): HTMLButtonElement {
  const button = Object.assign(document.createElement('button'), {
    type,
    className,
    textContent: text,
    id,
    value,
    role,
  });

  return button;
}

export default Button;
