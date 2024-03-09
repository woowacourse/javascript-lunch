type ButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  className: string;
  text: string;
};

function Button({ type = 'button', className, text }: ButtonProps): HTMLButtonElement {
  const button = document.createElement('button');
  button.type = type;
  button.className = className;
  button.textContent = text;

  return button;
}

export default Button;
