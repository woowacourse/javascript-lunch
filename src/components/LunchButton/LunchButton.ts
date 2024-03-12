import './style.css';

type LunchButtonColor = 'primary' | 'secondary';
type LunchButtonType = 'submit' | 'reset' | 'button';

interface LunchButtonProps {
  text: string;
  color: LunchButtonColor;
  type: LunchButtonType;
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
    const color = (this.getAttribute('color') as LunchButtonColor) ?? 'primary';
    const type = (this.getAttribute('type') as LunchButtonType) ?? 'button';
    this.innerHTML = LUNCH_BUTTON({ text, color, type });
  }
}

customElements.define('lunch-button', LunchButton);
