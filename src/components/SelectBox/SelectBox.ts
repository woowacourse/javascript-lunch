import BaseComponent from '../BaseComponent';

class SelectBox extends BaseComponent {
  #optionValues;
  #id;

  constructor(optionValues: string[], id: string) {
    super();
    this.#optionValues = optionValues;
    this.#id = id;
  }

  render() {
    const selectTag = this.#makeSelectTag();
    this.append(selectTag);
  }

  #makeSelectTag() {
    const selectTag = document.createElement('select');
    selectTag.classList.add('restaurant-filter');
    selectTag.name = 'category';
    selectTag.id = this.#id;

    selectTag.append(this.#makeOptionTags());
    return selectTag;
  }

  #makeOptionTags() {
    const fragment = new DocumentFragment();
    this.#optionValues.forEach((category) => {
      const optionTag = document.createElement('option');
      optionTag.value = category;
      optionTag.textContent = category;
      fragment.append(optionTag);
    });
    return fragment;
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox);
