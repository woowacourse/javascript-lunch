import LunchItemFilter from '../LunchItemFilter/LunchItemFilter';
import './style.css';
import TabButton from './TabButton';

interface LunchTabProps {
  className?: string[];
  name: string;
  textContent: string;
}

class LunchTab extends HTMLElement {
  nowSelected;

  constructor(props: LunchTabProps[]) {
    super();
    this.nowSelected = 'all-restaurants';
    this.className = 'lunch-tab';
    this.createTabItems(props);
    this.setEventListener();
  }

  // eslint-disable-next-line max-lines-per-function
  createTabItems(props: LunchTabProps[]) {
    props.forEach((prop) => {
      this.appendChild(
        new TabButton({
          className: prop.className,
          name: prop.name,
          textContent: prop.textContent,
        }),
      );
    });
  }

  setEventListener() {
    this.addEventListener('tabClick', (event) => {
      if (!(event instanceof CustomEvent)) return;
      this.handleNowSelected(event);
      this.handleTabDesign();
      this.handleRenderItems();
      this.handleResetFilter();
    });
  }

  handleNowSelected(event: CustomEvent) {
    this.nowSelected = event.detail.name;
  }

  handleTabDesign() {
    const tabItems = this.querySelectorAll('.tab-button');
    tabItems.forEach((tabButton) => {
      tabButton.classList.remove('tab-button__active');
      if ((tabButton as HTMLButtonElement).name === this.nowSelected) {
        tabButton.classList.add('tab-button__active');
      }
    });
  }

  handleRenderItems() {
    const renderEvent = new CustomEvent('render', { bubbles: true });
    this.dispatchEvent(renderEvent);
  }

  handleResetFilter() {
    const filter = document.querySelector('lunch-item-filter') as LunchItemFilter;
    filter.resetDropdown();
    if (this.nowSelected === 'favorite-restaurants') {
      filter.classList.add('restaurant-filter-container__hidden');
    } else {
      filter.classList.remove('restaurant-filter-container__hidden');
    }
  }
}

customElements.define('lunch-tab', LunchTab);

export default LunchTab;
