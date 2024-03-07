import './style.css';

interface LunchButtonProps {
  text: string;
  color: string;
}

const LUNCH_BUTTON = ({ text, color }: LunchButtonProps) => `
  <button class="button button--${color} text-caption">${text}</button>
`;

class LunchButton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const text = this.getAttribute('text') ?? '';
    const color = this.getAttribute('color') ?? '';
    this.innerHTML = LUNCH_BUTTON({ text, color });
  }
}

customElements.define('lunch-button', LunchButton);
