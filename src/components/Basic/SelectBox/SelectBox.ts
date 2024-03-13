import BaseComponent from '@/components/BaseComponent';

import './SelectBox.css';
class SelectBox<T extends string> extends HTMLSelectElement {
  #optionValues: T[];
  #name;

  constructor(optionValues: T[], name: string) {
    super();
    this.#optionValues = optionValues;
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
    this.#optionValues.forEach((option) => {
      const optionTag = new Option();
      optionTag.value = option; //5
      optionTag.textContent = option; //5분 내
      this.add(optionTag);
    });
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox, { extends: 'select' });
