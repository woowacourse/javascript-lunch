import './TabElement.css';
import TabElementProps from './TabElementProps';

class TabElement extends HTMLButtonElement {
  private active: boolean;
  private indicator: HTMLDivElement;

  constructor(tabElement: TabElementProps) {
    super();

    const { active, text } = tabElement;
    this.classList.add('tab-element', 'text-subtitle');
    this.textContent = text;
    this.active = active;
    this.indicator = this.createIndicator();
    this.activeTab();
  }

  createIndicator() {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    this.appendChild(indicator);
    return indicator;
  }

  setActive() {
    this.classList.add('tab-element-active');
    this.indicator.classList.add('indicator-active');
  }

  setInactive() {
    this.classList.remove('tab-element-active');
    this.indicator.classList.remove('indicator-active');
  }

  activeTab() {
    this.active ? this.setActive() : this.setInactive();
  }
}

customElements.define('matzip-tab-element', TabElement, {extends: 'button'});

export default TabElement;
