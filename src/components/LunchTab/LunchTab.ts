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

  // eslint-disable-next-line max-lines-per-function
  setEventListener() {
    this.addEventListener('tabClick', (event) => {
      if (!(event instanceof CustomEvent)) return;
      if (this.nowSelected !== event.detail.name) {
        this.handleNowSelected(event);
        this.handleChangeTabDesign();
        this.handleResetFilter();
        this.handleRenderItems();
      }
    });
  }

  handleResetTab() {
    if (this.nowSelected !== 'all-restaurants') {
      this.nowSelected = 'all-restaurants';
      this.handleChangeTabDesign();
    }
  }

  handleNowSelected(event: CustomEvent) {
    this.nowSelected = event.detail.name;
  }

  handleChangeTabDesign() {
    const tabItems = this.querySelectorAll('.tab-button');
    tabItems.forEach((tabButton) => {
      tabButton.classList.toggle('tab-button__active');
    });
    const filter = document.querySelector('lunch-item-filter') as LunchItemFilter;
    filter.classList.toggle('restaurant-filter-container__hidden');
  }

  handleRenderItems() {
    const renderEvent = new CustomEvent('render', { bubbles: true });
    this.dispatchEvent(renderEvent);
  }

  handleResetFilter() {
    const resetFilterDropdowns = new CustomEvent('resetFilterDropdowns', { bubbles: true });
    this.dispatchEvent(resetFilterDropdowns);
  }
}

customElements.define('lunch-tab', LunchTab);

export default LunchTab;
