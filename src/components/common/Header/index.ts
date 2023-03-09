import Component from '../../Component';
import style from './index.css';

class Header extends Component {
  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  override renderTemplate() {
    return `
      <header>
        <h2>${this.getAttribute('title') ?? ''}</h2>

        <slot name="actions"></slot>
      </header>
    `;
  }
}

customElements.define('r-header', Header);

export default Header;
