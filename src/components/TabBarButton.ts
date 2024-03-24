type Props = {
  text: string;
  onClick: () => void;
  id: string;
  isPrimary: boolean;
};

const TabBarButton = ({ text, onClick, id, isPrimary }: Props) => {
  const getButtonStateClass = (isPrimary: boolean): string => {
    return `tabBar_button--${isPrimary ? 'primary' : 'secondary'}`;
  };

  const initializeButton = (
    text: string,
    id: string,
    buttonStateClass: string,
    onClick: () => void
  ): HTMLButtonElement => {
    const button = document.createElement('button');
    button.classList.add('tabBar_button', 'text-tabBar', buttonStateClass, 'text-subtitle');
    button.id = id;
    button.textContent = text;
    button.addEventListener('click', onClick);

    return button;
  };

  const assembleTabBarButton = () => {
    const buttonStateClass = getButtonStateClass(isPrimary);
    const tapBarButton = initializeButton(text, id, buttonStateClass, onClick);

    return tapBarButton;
  };

  const create = (): HTMLButtonElement => assembleTabBarButton();

  return { create };
};

export default TabBarButton;
