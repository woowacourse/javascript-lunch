const Button = (type: 'button' | 'submit' | 'reset', variant: 'primary' | 'secondary', content: string) => {
  const button = document.createElement('button');

  button.type = type;
  button.classList.add('button', `button--${variant}`, 'text-caption');
  button.textContent = content;

  return button;
};

export default Button;
