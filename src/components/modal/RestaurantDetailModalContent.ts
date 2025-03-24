import { Restaurant } from '../../types/types';
import createDOMElement from '../../util/createDomElement';
import ActionButton from '../button/ActionButton';
import CTAButton from '../button/CTAButton';
import FavoriteButton from '../button/FavoriteButton';
import RestaurantDetailInfo from './RestaurantDetailInfo';

function RestaurantDetailModalContent({ restaurant }: { restaurant: Restaurant }) {
  return createDOMElement({
    tag: 'div',
    class: 'modal-container',
    children: [
      RestaurantDetailInfo({ restaurant: restaurant }),
      createDOMElement({
        tag: 'div',
        class: 'button-container',
        children: [ActionButton({ text: '삭제하기', type: 'button' }), CTAButton({ text: '닫기', type: 'submit' })],
      }),
      FavoriteButton({ isFavorite: restaurant.isFavorite, isDetail: true }),
    ],
  });
}

export default RestaurantDetailModalContent;
