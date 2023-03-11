type SelectorStyle = {
  name: 'category' | 'sorting';
  id: 'category-filter' | 'sorting-filter';
  options: { value: string; name: string }[];
};

class Selector {
  #target;

  style?: SelectorStyle;

  constructor($target: Element) {
    this.#target = $target;
  }

  template(selector: string, selectorStyle: SelectorStyle) {
    this.style = selectorStyle;

    return `
    <select name="${selectorStyle.name}" id="${
      selectorStyle.id
    }" class="restaurant-filter">
        ${selectorStyle.options
          .map(
            (option) =>
              `<option value="${option.value}" ${
                selector === option.value ? 'selected' : ''
              }>${option.name}</option>`
          )
          .join('')}
      </select>
    `;
  }

  render(selector: string, selectorStyle: SelectorStyle) {
    this.#target.innerHTML += this.template(selector, selectorStyle);

    return this;
  }

  addEvent(eventTarget: Element) {
    if (!eventTarget) throw new Error('[ERROR]');

    return this;
  }

  setEvent() {
    this.#target.addEventListener('change', (e) => {
      if (
        e.target instanceof HTMLSelectElement &&
        e.target.closest(`#${this.style?.id}`)
      ) {
        this.addEvent(e.target);
      }
    });
  }
}

export default Selector;
