import { ButtonComponentProps } from '../../types/components';

function Button({ type = 'button', className, text }: ButtonComponentProps): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = type;
  button.className = className;
  button.textContent = text;

  return button;
}

export default Button;
