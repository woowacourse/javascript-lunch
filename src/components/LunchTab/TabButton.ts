import './style.css';

interface TabButtonProps {
  name: string;
  textContent: string;
}

class TabButton extends HTMLButtonElement {
  constructor(props: TabButtonProps) {
    super();

    this.className = 'tab-button text-subtitle';
    this.name = props.name;
    this.textContent = props.textContent;
    this.setEventListener();
  }

  setEventListener() {
    this.addEventListener('click', () => {
      this.handleClickEvent();
    });
  }

  handleClickEvent() {
    const tabClickEvent = new CustomEvent('tabClick', {
      detail: { name: this.name },
      bubbles: true,
    });
    this.dispatchEvent(tabClickEvent);
  }
}

customElements.define('tab-button', TabButton, { extends: 'button' });

export default TabButton;
