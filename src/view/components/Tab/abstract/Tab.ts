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
