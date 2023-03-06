import { useEvents } from '../../utils/core';

interface HeaderProps {
  open: VoidFunction;
}

function Header({ open }: HeaderProps) {
  const [addEvent] = useEvents('.gnb');

  addEvent('click', '.gnb__button', (e) => {
    open();
  });

  return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="./add-button.png" alt="음식점 추가">
      </button>
    </header>
  `;
}

export { Header };
