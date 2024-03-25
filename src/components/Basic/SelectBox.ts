import './SelectBox.css';

class SelectBox<T extends string> extends HTMLSelectElement {
  values: T[] = [];
  #texts: string[] = [];
  #name = '';

  constructor(values: T[] = [], texts: string[] = [], name: string = '') {
    super();
    this.values = values;
    this.#texts = texts;
    this.#name = name;
    this.render();
  }

  set(values: T[], texts: string[], name: string) {
    this.values = values;
    this.#texts = texts;
    this.#name = name;
    this.render();
  }

  get() {
    return this.values[this.selectedIndex];
  }

  render() {
    this.classList.add('restaurant-filter');
    this.name = this.#name;
    this.id = `${this.#name}-filter`;
    this.#makeOptionTags();
  }

  #makeOptionTags() {
    for (let i = 0; i < this.values.length; i++) {
      const optionTag = new Option(this.#texts[i], this.values[i]);
      this.add(optionTag);
    }
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox, { extends: 'select' });
