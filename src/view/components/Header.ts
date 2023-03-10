import { useEvents } from '../../utils/core';
import '../../assets/add-button.png';
import { Button } from './Button';

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
      ${Button({
        children: '<img src="./add-button.png" alt="음식점 추가">',
        attribute: {
          class: 'gnb__button',
          type: 'button',
          'aria-label': '음식점 추가',
        },
      })}      
    </header>
  `;
}

export { Header };
