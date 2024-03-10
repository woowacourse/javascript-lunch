import ButtonProps from './ButtonProps';

class Button extends HTMLButtonElement {
  constructor(props: ButtonProps) {
    super();
    const { type, classnames, ariaLabel, children, disabled } = props;

    this.type = type;
    this.classList.add(...classnames);
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
