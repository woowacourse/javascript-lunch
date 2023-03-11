import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { getClosest } from '../../utils/common/domHelper';
import { useEvents } from '../../utils/core';
import { useForm } from '../../utils/hooks/useForm';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Button } from './Button';
import { Modal } from './Modal';
import { Restaurant } from './Restaurant';

interface RestaurantInfoModalProps {
  info: RestaurantInfo;
  close: VoidFunction;
  handleFavoriteBtn(id: RestaurantInfo['id']): void;
}

function RestaurantInfoModal({ info, close, handleFavoriteBtn }: RestaurantInfoModalProps) {
  const {
    handlers: { handleClickAddBtn },
  } = useRestaurants();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [addEvent] = useEvents('.modal');

  addEvent('click', '.favorite-icon', (e) => {
    const restaurantId = getClosest(e.target, '.restaurant')?.dataset.id;

    if (restaurantId) handleFavoriteBtn(Number(restaurantId));
  });

  const closeModal = () => close();

  return Modal({
    closeModal,
    children: `
        ${Restaurant({
          info,
          attribute: {
            class: 'restaurant dir-column',
            'data-id': String(info.id),
          },
        })}
        ${info.link ? `<a class="info-modal-link">${info.link}</a>` : ''}
        <div class="button-container">
            ${Button({
              children: '삭제하기',
              attribute: {
                type: 'reset',
                class: 'button button--secondary text-caption',
              },
            })}
            ${Button({
              children: '닫기',
              onClick: closeModal,
              attribute: {
                class: 'button button--primary text-caption',
              },
            })}
        </div>
  `,
  });
}

export { RestaurantInfoModal };
