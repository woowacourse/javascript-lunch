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

  render() {
    this.className = 'restaurant-filter';
    this.name = this.#name;
    this.id = `${this.#name}-filter`;
    this.#makeOptionTags();
  }
  //TODO: 메인의 필터링과 새로운 음식점 추가 모달에서 class 다름 => 고치기
  //TODO: 메인의 필터링과 새로운 음식점 추가 모달에서 아이디가 다름 => 고치기

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
