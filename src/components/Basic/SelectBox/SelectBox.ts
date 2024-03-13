import BaseComponent from '@/components/BaseComponent';

import './SelectBox.css';

interface Options<T> {
  values: T[];
  texts: string[];
}

class SelectBox<T extends string> extends HTMLSelectElement {
  #options: Options<T>;
  #name;

  constructor(options: Options<T>, name: string) {
    super();
    this.#options = options;

    this.#name = name;
    this.render();
  }

  // TODO: 추후 id와 name을 다르게 사용할 수 있게 열어 주는 게 좋음.
  render() {
    this.className = 'restaurant-filter';
    this.name = this.#name;
    this.id = `${this.#name}-filter`;
    this.#makeOptionTags();
  }

  #makeOptionTags() {
    for (let i = 0; i < this.#options.values.length; i++) {
      const optionTag = new Option(this.#options.texts[i], this.#options.values[i]);
      this.add(optionTag);
    }
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox, { extends: 'select' });
