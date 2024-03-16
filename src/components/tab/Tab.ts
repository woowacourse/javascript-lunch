import './Tab.css';
import TabElement from "./TabElement";
import DOM from '../../utils/DOM';

const { insertElementsInTarget } = DOM;

class Tab extends HTMLDivElement {
  private tabElements: TabElement[];
  private activeIndex: number;

  constructor(tabNames: string[]) {
    super();
    this.className = 'tab';
    this.activeIndex = 0;
    this.tabElements = this.createTabElements(tabNames);
    this.tabChange();
  }

  createTabElements(tabNames: string[]) {
    const tabElements = tabNames.map((tabName, index) => new TabElement({
      active: index === this.activeIndex, 
      tabName,
      index,
    }));
    insertElementsInTarget(this, tabElements);
    return tabElements;
  }

  tabChange() {
    this.tabElements.forEach((tabElement) => {
      tabElement.tabClick(this.clearActivate.bind(this), this.setActiveTab.bind(this));
    });
  }

  private clearActivate() {
    this.tabElements.forEach((tab) => tab.setInactive());
  }

  setActiveTab(index: number) {
    this.activeIndex = index;
  }
  
  get activeTabIndex() {
    return this.activeIndex;
  }
}

customElements.define('matzip-tab', Tab, {extends: 'div'});

export default Tab;
