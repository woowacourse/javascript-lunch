import './Tab.css';
import TabElement from "./TabElement";
import TabElementProps from "./TabElementProps";
import DOM from '../../utils/DOM';

const { insertElementsInTarget } = DOM;

class Tab extends HTMLDivElement {
  private tabElements: TabElement[];

  constructor(tabElementsProps: TabElementProps[]) {
    super();
    this.className = 'tab-container';
    this.tabElements = this.createTabElements(tabElementsProps);
  }

  createTabElements(tabElementsProps: TabElementProps[]) {
    const tabElements = tabElementsProps.map((tabProps) => new TabElement(tabProps));
    insertElementsInTarget(this, tabElements);
    return tabElements;
  }
}

customElements.define('matzip-tab', Tab, {extends: 'div'});

export default Tab;
