import { ButtonComponentProps } from '../../types/components';

function Button({ type = 'button', className, text }: ButtonComponentProps): HTMLButtonElement {
  const button = Object.assign(document.createElement('button'), {
    type,
    className,
    textContent: text,
  });

  return button;
}

export default Button;
