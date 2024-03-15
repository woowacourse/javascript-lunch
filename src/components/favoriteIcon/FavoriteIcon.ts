import './FavoriteIcon.css';

import Filled from '../../asset/img/favorite-icon-filled.png';
import Lined from '../../asset/img/favorite-icon-lined.png';

interface FavoriteIconProps {
  active: boolean;
}

class FavoriteIcon extends HTMLImageElement {
  private active: boolean;

  constructor({ active }: FavoriteIconProps) {
    super();
    this.active = active;
    this.src = this.showStarIcon();
    this.alt = 'favorite-icon';
    this.className = 'favorite-icon';
  }

  showStarIcon() {
    return this.active ? Filled : Lined;
  }
}

customElements.define('matzip-favorite-icon', FavoriteIcon, {extends: 'img'});

export default FavoriteIcon;
