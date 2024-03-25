interface Props {
  id: string;
  type: string;
  variant: string;
  content: string;
}

const createButton = ({ id, type, variant, content }: Props) => {
  const buttonContainer = document.createElement('button');
  buttonContainer.setAttribute('id', id);
  buttonContainer.setAttribute('type', type);
  buttonContainer.classList.add('button', `button--${variant}`, 'text-caption');
  buttonContainer.textContent = content;

  return buttonContainer;
};

export default createButton;
