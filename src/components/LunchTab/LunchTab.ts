import './style.css';
import TabButton from './TabButton';

interface LunchTabProps {
  name: string;
  textContent: string;
}

class LunchTab extends HTMLElement {
  constructor(props: LunchTabProps[]) {
    super();
    this.className = 'lunch-tab';
    this.createTabItems(props);
    this.setEventListener();
  }

  createTabItems(props: LunchTabProps[]) {
    props.forEach((prop) => {
      this.appendChild(new TabButton({ name: prop.name, textContent: prop.textContent }));
    });
  }

  setEventListener() {
    this.addEventListener('tabClick', (event) => {
      if (!(event instanceof CustomEvent)) return;
      this.handleTabClickEvent(event);
    });
  }

  handleTabClickEvent(event: CustomEvent) {
    const { name } = event.detail;
    const tabItems = this.querySelectorAll('.tab-button');
    tabItems.forEach((tabButton) => {
      tabButton.classList.remove('tab-button__active');
      if ((tabButton as HTMLButtonElement).name === name) {
        tabButton.classList.add('tab-button__active');
      }
    });
  }
}

customElements.define('lunch-tab', LunchTab);

export default LunchTab;
