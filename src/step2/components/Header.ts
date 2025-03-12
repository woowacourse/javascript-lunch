import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';
import Button from './@common/Button';

interface HeaderProps {
  openModal: () => void;
}

function Header({ openModal }: HeaderProps) {
  const eventManager = new EventManager($('#app'));

  eventManager.addEvent('click', '.gnb__button', () => {
    openModal();
  });

  return `
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
      ${Button({
        children: '<img src="./add-button.png" alt="음식점 추가" />',
        attribute: {
          type: 'button',
          class: 'gnb__button',
          'aria-label': '음식점 추가',
        },
      })}
      
    </header>
  `;
}
export default Header;
