import './style.css';

import LunchButton from '../LunchButton/LunchButton';

interface LunchFallbackScreenProps {
  text: string;
  buttonText?: string;
  onClick?: () => void;
}

class LunchFallbackScreen extends HTMLDivElement {
  constructor(props: LunchFallbackScreenProps) {
    super();

    this.classList.add('lunch-fallback-screen');
    this.createContainer();
    this.setText(props.text);
    if (props.buttonText) {
      this.createButton(props);
    }
  }

  createContainer() {
    const container = document.createElement('div');
    container.classList.add('lunch-fallback-container');
    this.appendChild(container);
  }

  setText(text: string) {
    const span = document.createElement('span');
    span.classList.add('fallback__text', 'text-body');
    span.textContent = text;
    this.querySelector('.lunch-fallback-container')?.appendChild(span);
  }

  createButton(props: LunchFallbackScreenProps) {
    this.querySelector('.lunch-fallback-container')?.appendChild(
      new LunchButton({
        text: props.buttonText ?? '',
        color: 'primary',
        type: 'button',
        onClick: props.onClick,
      }),
    );
  }
}

customElements.define('lunch-fallback-screen', LunchFallbackScreen, { extends: 'div' });

export default LunchFallbackScreen;
