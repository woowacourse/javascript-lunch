import { imgSrc } from '../../constants/image';
import store from '../../store';
import { Category, Distance, Restaurant } from '../../types';
import RestaurantItems from '../RestaurantItems';
import $template from './index.html';

interface Props {
  restaurant: Restaurant;
  onRemoveButtonClick: () => void;
  onCloseButtonClick: () => void;
  onFavoriteButtonClick: () => void;
}

class DetailModal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  setProps({ restaurant, onRemoveButtonClick, onCloseButtonClick, onFavoriteButtonClick }: Props) {
    this.render(restaurant);
    this.setHandleRemoveButtonClick({ onRemoveButtonClick });
    this.setHandleCloseButtonClick({ onCloseButtonClick });
    this.setHandleFavoriteButtonClick({ onFavoriteButtonClick });
  }

  private setHandleRemoveButtonClick({ onRemoveButtonClick }: Pick<Props, 'onRemoveButtonClick'>) {
    const $removeButton = this.querySelector<HTMLButtonElement>('#remove-button')!;
    $removeButton.addEventListener('click', () => {
      onRemoveButtonClick();
      this.toggle();
    });
  }

  private setHandleCloseButtonClick({ onCloseButtonClick }: Pick<Props, 'onCloseButtonClick'>) {
    const $closeButton = this.querySelector<HTMLButtonElement>('#close-button')!;
    // 닫기
    $closeButton.addEventListener('click', () => {
      const $restaurantItems = document.querySelector('restaurant-items') as InstanceType<
        typeof RestaurantItems
      >;
      onCloseButtonClick();
      this.toggle();
    });
  }

  private setHandleFavoriteButtonClick({
    onFavoriteButtonClick,
  }: Pick<Props, 'onFavoriteButtonClick'>) {
    const $favoriteIcon = this.querySelector<HTMLElement>('favorite-icon')!;
    // 즐겨찾기 추가
    $favoriteIcon.addEventListener('click', (e: MouseEvent) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      onFavoriteButtonClick();
      this.querySelector('favorite-icon')!.toggleAttribute('isfavorite');
    });
  }

  render({ category, name, distance, isFavorite, description, link }: Restaurant) {
    this.innerHTML = $template
      .replaceAll('{src}', imgSrc[category])
      .replaceAll('{category}', category)
      .replaceAll('{name}', name)
      .replaceAll('{distance}', distance + '')
      .replaceAll('{description}', description || '')
      .replaceAll('{link}', link || '')
      .replaceAll('{isfavorite}', isFavorite ? 'isfavorite' : '');
  }

  toggle() {
    const $modal = this.querySelector('.detail-modal') as HTMLDivElement;

    $modal?.classList.toggle('modal--open');
  }
}

export default DetailModal;
