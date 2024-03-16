import ButtonProps from './ButtonProps';
import './button.css';

class Button extends HTMLButtonElement {
  constructor(props: ButtonProps) {
    super();
    const { type, classnames, ariaLabel, children, disabled, varient } = props;

    this.type = type;
    if (classnames !== undefined) this.classList.add(...classnames);
    this.classList.add(`${varient}__button`);
    if (ariaLabel !== undefined) this.ariaLabel = ariaLabel;

    if (typeof children === 'string') this.textContent = children;
    if (children instanceof HTMLImageElement) {
      this.appendChild(children);
    }
    if (disabled !== undefined) this.disabled = disabled;
  }
}

customElements.define('matzip-button', Button, { extends: 'button' });

export default Button;