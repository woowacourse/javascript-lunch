type Props = {
  text: string;
  onClick: () => void;
  isPrimary: boolean;
};

const TabBarButtonComponent = ({ text, onClick, isPrimary }: Props) => {
  const tapBarButton = document.createElement('button');
  const buttonStateClass = `tabBar_button--${isPrimary ? 'primary' : 'secondary'}`;

  tapBarButton.classList.add('tabBar_button', 'text-tabBar');
  tapBarButton.classList.add(buttonStateClass);

  tapBarButton.textContent = text;
  tapBarButton.addEventListener('click', () => {
    onClick();
  });

  const create = () => tapBarButton;

  return {
    create
  };
};

export default TabBarButtonComponent;
