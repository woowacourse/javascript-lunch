import { $$ } from '../../../../utils/querySelector';

class Tab {
  #target;

  constructor($target: Element) {
    this.#target = $target;
  }

  template(className: string, tabName: string) {
    return `<li class="tab ${className}">${tabName}</li>`;
  }

  render(className: string, tabName: string) {
    this.#target.innerHTML += this.template(className, tabName);

    return this;
  }

  tabEvent() {
    $$('.tab').forEach((tab) => {
      tab.classList.remove('tab--open');
    });
  }

  addEvent(eventTarget: Element) {
    if (!eventTarget) throw new Error('[ERROR]');

    return this;
  }

  setEvent() {
    this.#target.addEventListener('click', (e) => {
      if (e.target instanceof HTMLLIElement) {
        this.addEvent(e.target);
      }
    });
  }
}

export default Tab;
