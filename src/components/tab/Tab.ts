import './Tab.css';
import TabElement from './TabElement';
import DOM from '../../utils/DOM';
import TabPane from '../TabPane';

const { insertElementsInTarget } = DOM;

class Tab extends HTMLDivElement {
  private tabElements: TabElement[];
  private activeIndex: number;
  private tabPane: TabPane;

  constructor(tabNames: string[], main: HTMLElement) {
    super();
    this.className = 'tab';
    this.activeIndex = 0;
    this.tabElements = this.createTabElements(tabNames);
    this.tabPane = this.createTabPane(main);
    this.showTabPaneAfterDomLoaded();
    this.listenTabChange();
  }

  createTabElements(tabNames: string[]) {
    const tabElements = tabNames.map(
      (tabName, index) =>
        new TabElement({
          active: index === this.activeIndex,
          tabName,
          index,
        }),
    );
    insertElementsInTarget(this, tabElements);
    return tabElements;
  }

  createTabPane(main: HTMLElement) {
    const tabPane = new TabPane();
    main.appendChild(tabPane);
    return tabPane;
  }

  listenTabChange() {
    this.addEventListener('click', (event: Event) => {
      const target = event.target as TabElement;
      this.clearActivate();
      target.setActive();
      this.activeIndex = target.getIndex;
      this.showTabPaneContent(target.getIndex);
    });
  }

  showTabPaneAfterDomLoaded() {
    document.addEventListener('DOMContentLoaded', () => {
      this.showTabPaneContent(this.activeIndex);
    });
  }

  showTabPaneContent(activeIndex: number) {
    activeIndex === 0 ? this.tabPane.createWholeRestaurant() : this.tabPane.createMyFavoriteList();
  }

  private clearActivate() {
    this.tabElements.forEach((tab) => tab.setInactive());
  }
}

customElements.define('matzip-tab', Tab, { extends: 'div' });

export default Tab;
