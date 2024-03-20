import './FavoriteIcon.css';

import Filled from '../../asset/img/favorite-icon-filled.png';
import Lined from '../../asset/img/favorite-icon-lined.png';

export interface IconStateChangeEvent extends CustomEvent {
  detail: {
    targetId: string;
    state: boolean;
  };
}

interface FavoriteIconProps {
  active: boolean;
  isChild: boolean;
  changeState: ChangeStateProps;
}

export interface ChangeStateProps {
  addFavorite: () => void;
  deleteFavorite: () => void;
  targetId: string;
}

class FavoriteIcon extends HTMLImageElement {
  private active: boolean;

  constructor({ active, isChild, changeState }: FavoriteIconProps) {
    super();
    this.active = active;
    this.src = this.getStarIconSource();
    this.alt = 'favorite-icon';
    this.className = 'favorite-icon';
    isChild
      ? this.classList.add('favorite-icon-cloned')
      : this.classList.add('favorite-icon-origin');
    this.stopEventBubbling();
    this.listenChangeState(changeState);
  }

  getStarIconSource() {
    return this.active ? Filled : Lined;
  }

  listenChangeState({ addFavorite, deleteFavorite, targetId }: ChangeStateProps) {
    this.addEventListener('click', (event) => {
      event.stopPropagation();
      this.active ? deleteFavorite() : addFavorite();
      this.active = !this.active;
      this.src = this.getStarIconSource();
      const iconStateChangeEvent = new CustomEvent('iconStateChange', {
        detail: {
          targetId,
          state: this.active,
        },
      });
      document.dispatchEvent(iconStateChangeEvent);
    });
  }

  stopEventBubbling() {
    this.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }
}

customElements.define('matzip-favorite-icon', FavoriteIcon, { extends: 'img' });

export default FavoriteIcon;
