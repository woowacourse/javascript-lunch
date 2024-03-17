type Props = {
  text: string;
  onClick: () => void;
  id: string;
  isPrimary: boolean;
};

const TabBarButton = ({ text, onClick, id, isPrimary }: Props) => {
  const tapBarButton = document.createElement('button');
  const buttonStateClass = `tabBar_button--${isPrimary ? 'primary' : 'secondary'}`;

  tapBarButton.classList.add('tabBar_button', 'text-tabBar');
  tapBarButton.classList.add(buttonStateClass, 'text-subtitle');
  tapBarButton.id = id;

  tapBarButton.textContent = text;
  tapBarButton.addEventListener('click', () => {
    onClick();
  });

  const create = () => tapBarButton;

  return {
    create
  };
};

export default TabBarButton;
