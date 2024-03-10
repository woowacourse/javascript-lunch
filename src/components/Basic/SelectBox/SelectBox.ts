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
    const selectTag = this.#makeSelectTag();
    // this.append(selectTag);
    // this.outerHTML = selectTag.outerHTML; // TODO: 임시방편인 outerHTML 없애도록.
  }

  #makeSelectTag() {
    // const this = document.createElement('select');
    //TODO: 메인의 필터링과 새로운 음식점 추가 모달에서 class 다름 => 고치기
    this.className = 'restaurant-filter';
    this.name = this.#name;
    //TODO: 메인의 필터링과 새로운 음식점 추가 모달에서 아이디가 다름 => 고치기
    this.id = `${this.#name}-filter`;

    this.append(this.#makeOptionTags());
    return this;
  }

  #makeOptionTags() {
    const fragment = new DocumentFragment();
    this.#optionValues.forEach((option) => {
      const optionTag = document.createElement('option');
      optionTag.value = option; //5
      optionTag.textContent = option; //5분 내
      fragment.append(optionTag);
    });
    return fragment;
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox, { extends: 'select' });
