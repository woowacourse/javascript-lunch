import Component from '../../Component';
import { define } from '../../decorators';

@define('r-favorite-icon')
class FavoriteIcon extends Component {
  static get observedAttributes() {
    return ['active'];
  }

  getRenderTemplate() {
    return `
      <img src="assets/favorite-icon-${this.hasAttribute('active') ? 'filled' : 'lined'}.png">
    `;
  }
}

export default FavoriteIcon;
