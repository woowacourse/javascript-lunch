import { iconSrc } from '../../image';

class FavoriteIcon extends HTMLElement {
  constructor() {
    super();
  }

  render(isFavorite: boolean) {
    const imgSrc = isFavorite ? iconSrc.filled : iconSrc.lined;
    return `<img src="${imgSrc}" class="favorite-icon" />`;
  }
}

export default FavoriteIcon;
