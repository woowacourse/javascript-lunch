import { AttributeWithoutChildren } from '../../types/typeUtils';
import createDOMElement from '../../util/createDomElement';

interface FavoriteButtonProps extends AttributeWithoutChildren<'button'> {
  onclick?: () => void;
  isFavorite: boolean;
  isDetail?: boolean;
}

function FavoriteButton({ onclick, isFavorite, isDetail = false, ...attribute }: FavoriteButtonProps) {
  return createDOMElement({
    tag: 'button',
    type: 'button',
    class: `restaurant__favorite-button ${isDetail ? 'restaurant__favorite-button--detail' : ''}`,
    onclick,
    ...attribute,
    'aria-label': '음식점 추가',
    children: [
      createDOMElement({
        tag: 'img',
        src: isFavorite ? 'images/favorite-icon-filled.png' : 'images/favorite-icon-lined.png',
        alt: '음식점 추가',
      }),
    ],
  });
}

export default FavoriteButton;
