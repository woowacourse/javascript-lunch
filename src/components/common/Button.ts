type Props = {
  id: string;
  text: string;
  variant: 'primary' | 'secondary';
  type?: 'button';
  isDisabled?: boolean;
  onClick: () => void;
};

const Button = ({ id, text, variant, type, isDisabled = false, onClick }: Props) => {
  const button = document.createElement('button');
  if (type === 'button') {
    button.type = type;
  }
  button.classList.add('button', `button--${variant}`, 'text-caption');
  button.textContent = text;
  button.id = id;

  button.disabled = isDisabled;
  button.addEventListener('click', onClick);

  const create = () => button;

  return {
    create
  };
};

export default Button;
