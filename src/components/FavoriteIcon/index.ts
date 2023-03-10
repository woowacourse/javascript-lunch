import $template from './index.html';
import { iconSrc } from '../../image';

class FavoriteIcon extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const favorite = this.getAttribute('favorite');
    const imgSrc = favorite === 'true' ? iconSrc.filled : iconSrc.lined;
    this.innerHTML = $template.replace('{src}', imgSrc);
  }
}

export default FavoriteIcon;
