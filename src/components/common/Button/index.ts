import { define } from '../../decorators';
import FormControlComponent from '../../FormControlComponent';
import style from './index.css';

@define('r-button')
class Button extends FormControlComponent {
  override get value() {
    return this.getAttribute('type') ?? '';
  }

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  override getRenderTemplate() {
    return `
      <button type="button" class="text-caption">
        <slot></slot>
      </button>
    `;
  }
}

export default Button;
