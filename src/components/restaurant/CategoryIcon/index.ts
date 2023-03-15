import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

@define('r-category-icon')
class CategoryIcon extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  override getRenderTemplate() {
    return `
      <div>
        <img
          src="assets/categories/${this.getAttribute('category')}.png"
          alt="${this.getAttribute('category')}"
        >
      </div>
    `;
  }
}

export default CategoryIcon;
