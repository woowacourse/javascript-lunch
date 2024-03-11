import './style.css';

interface LunchButtonProps {
  text: string;
  color: string;
  type: string;
}

const LUNCH_BUTTON = (props: LunchButtonProps) => `
  <button class="button button--${props.color} text-caption" type="${props.type}">${props.text}</button>
`;

class LunchButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const text = this.getAttribute('text') ?? '';
    const color = this.getAttribute('color') ?? '';
    const type = this.getAttribute('type') ?? '';
    this.innerHTML = LUNCH_BUTTON({ text, color, type });
  }
}

customElements.define('lunch-button', LunchButton);
