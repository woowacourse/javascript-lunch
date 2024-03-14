import './style.css';
import TabButton from './TabButton';

interface LunchTabProps {
  name: string;
  textContent: string;
}

interface HandleEventProps {
  props: LunchTabProps[];
  name: string;
}

class LunchTab extends HTMLElement {
  constructor(props: LunchTabProps[]) {
    super();
    this.className = 'lunch-tab';
    this.createTabItems(props);
    this.setEventListener(props);
  }

  createTabItems(props: LunchTabProps[]) {
    props.forEach((prop) => {
      this.appendChild(new TabButton({ name: prop.name, textContent: prop.textContent }));
    });
  }

  setEventListener(props: LunchTabProps[]) {
    this.addEventListener('tabClick', (event) => {
      const { name } = (event as CustomEvent).detail;
      this.handleTabClickEvent({ props, name });
    });
  }

  handleTabClickEvent(props: HandleEventProps) {
    const tabItems = this.querySelectorAll('.tab-button');
    tabItems.forEach((tabButton) => {
      tabButton.classList.remove('tab-button__active');
      if ((tabButton as HTMLButtonElement).name === props.name) {
        tabButton.classList.add('tab-button__active');
      }
    });
  }
}

customElements.define('lunch-tab', LunchTab);

export default LunchTab;
