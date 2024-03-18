class Button extends HTMLButtonElement {
  connectedCallback() {
    this.classList.add('button', 'text-caption');
  }
}

export default Button;
