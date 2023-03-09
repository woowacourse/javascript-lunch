import FormControlComponent from '../../FormControlComponent';
import style from './index.css';

class Button extends FormControlComponent {
  override get value() {
    return this.getAttribute('type') ?? '';
  }

  override getCSSStyleSheets() {
    return [...super.getCSSStyleSheets(), style];
  }

  override renderTemplate() {
    return `
      <button type="button" class="text-caption">
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('r-button', Button);

export default Button;
