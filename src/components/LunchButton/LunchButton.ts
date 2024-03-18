import './style.css';

type LunchButtonColor = 'primary' | 'secondary';
type LunchButtonType = 'submit' | 'reset' | 'button';

interface LunchButtonProps {
  text: string;
  color: LunchButtonColor;
  type: LunchButtonType;
  onClick?: () => void;
}
class LunchButton extends HTMLButtonElement {
  constructor(props: LunchButtonProps) {
    super();

    this.createButton(props);
    if (props.onClick) {
      this.setEventListener(props);
    }
  }

  createButton(props: LunchButtonProps) {
    this.className = `button button--${props.color}  text-caption`;
    this.type = props.type;
    this.textContent = props.text;
  }

  setEventListener(props: LunchButtonProps) {
    if (props.onClick) {
      this.addEventListener('click', props.onClick);
    }
  }
}

customElements.define('lunch-button', LunchButton, { extends: 'button' });

export default LunchButton;
