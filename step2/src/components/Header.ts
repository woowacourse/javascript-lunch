import useModal from '../hooks/useModal';
import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';
import Button from './@common/Button';
import Modal from './@common/Modal';
import RestaurantForm from './RestaurantForm';

function Header() {
  const [isModalOpen, openModal, closeModal] = useModal(false);
  const eventManager = new EventManager($('#app'));

  eventManager.addEvent('click', '.gnb__button', () => {
    openModal();
  });

  eventManager.addEvent('click', '#cancel-button', () => {
    closeModal();
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
    ${
      isModalOpen
        ? Modal({
            children: `
              <h2 class="modal-title text-title">새로운 음식점</h2>
              ${RestaurantForm({
                closeModal,
              })}
            `,
          })
        : ''
    }
  `;
}

export default Header;
