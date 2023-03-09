import Component from '../../Component';
import style from './index.css';

class CategoryIcon extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  override renderTemplate() {
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

customElements.define('r-category-icon', CategoryIcon);

export default CategoryIcon;
