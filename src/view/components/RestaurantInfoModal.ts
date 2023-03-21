import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { getClosest } from '../../utils/common/domHelper';
import { useEvents } from '../../utils/core';
import { Button } from './common/Button';
import { Modal } from './common/Modal';
import { Restaurant } from './Restaurant';

interface RestaurantInfoModalProps {
  info: RestaurantInfo;
  close: VoidFunction;
  handleFavoriteBtn(id: RestaurantInfo['id']): void;
  handleDeleteBtn(id: RestaurantInfo['id']): void;
}

function RestaurantInfoModal({
  info,
  close,
  handleFavoriteBtn,
  handleDeleteBtn,
}: RestaurantInfoModalProps) {
  const [addEvent] = useEvents('.modal');

  addEvent('click', '.favorite-icon', (e) => {
    const restaurantId = getClosest(e.target, '.modal')?.dataset.id;

    if (restaurantId) handleFavoriteBtn(Number(restaurantId));
  });

  addEvent('click', '.button--delete', (e) => {
    const restaurantId = getClosest(e.target, '.modal')?.dataset.id;
    const isReadyToDelete = confirm('정말 삭제하시겠습니까?');

    if (isReadyToDelete && restaurantId) {
      handleDeleteBtn(Number(restaurantId));
      closeModal();
    }
  });

  const closeModal = () => close();

  return Modal({
    closeModal,
    attribute: {
      class: 'modal modal--open',
      'data-id': String(info.id),
    },
    children: `
        ${Restaurant({
          info,
          attribute: {
            class: 'restaurant dir-column',
          },
        })}
        ${info.link ? `<a class="info-modal-link">${info.link}</a>` : ''}
        <div class="button-container">
            ${Button({
              children: '삭제하기',
              attribute: {
                type: 'reset',
                class: 'button button--secondary button--delete',
              },
            })}
            ${Button({
              children: '닫기',
              onClick: closeModal,
              attribute: {
                class: 'button button--primary',
              },
            })}
        </div>
  `,
  });
}

export { RestaurantInfoModal };
