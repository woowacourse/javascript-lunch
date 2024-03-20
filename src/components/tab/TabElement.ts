import './TabElement.css';
import TabElementProps from './TabElementProps';

class TabElement extends HTMLButtonElement {
  private active: boolean;
  private index: number;
  private indicator: HTMLDivElement;

  constructor(tabElement: TabElementProps) {
    super();

    const { active, tabName, index } = tabElement;
    this.classList.add('tab-element', 'text-subtitle');
    this.textContent = tabName;
    this.index = index;
    this.active = active;
    this.indicator = this.createIndicator();
    this.initTab();
  }

  createIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    this.appendChild(indicator);
    return indicator;
  }

  setActive() {
    this.active = true;
    this.classList.add('tab-element-active');
    this.indicator.classList.add('indicator-active');
  }

  setInactive() {
    this.active = false;
    this.classList.remove('tab-element-active');
    this.indicator.classList.remove('indicator-active');
  }

  get getIndex() {
    return this.index;
  }

  private initTab() {
    this.active ? this.setActive() : this.setInactive();
  }
}

customElements.define('matzip-tab-element', TabElement, { extends: 'button' });

export default TabElement;
