import Component from '../../Component';
import { define } from '../../decorators';
import style from './index.css';

@define('r-header')
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

export default Header;
