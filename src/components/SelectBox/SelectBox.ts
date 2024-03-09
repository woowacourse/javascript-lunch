import BaseComponent from '@/components/BaseComponent';

type SelectBoxProps = {
  optionValues: string[];
  name: string;
  classList: string[];
  id: string;
};
class SelectBox extends BaseComponent {
  #optionValues;
  #name;
  #classList;
  #id;

  constructor({ optionValues, name, classList, id }: SelectBoxProps) {
    super();
    this.#optionValues = optionValues;
    this.#name = name;
    this.#classList = classList;
    this.#id = id;
  }

  render() {
    const selectTag = this.#makeSelectTag();
    this.outerHTML = selectTag.outerHTML; // TODO: 임시방편인 outerHTML 없애도록.
    //this.append(selectTag);
  }

  #makeSelectTag() {
    const selectTag = document.createElement('select');
    //TODO: 메인의 필터링과 새로운 음식점 추가 모달에서 class 다름 => 고치기
    // selectTag.classList.add('restaurant-filter');
    selectTag.classList.add(...this.#classList);
    selectTag.id = this.#id;
    selectTag.name = this.#name;
    //TODO: 메인의 필터링과 새로운 음식점 추가 모달에서 아이디가 다름 => 고치기
    // selectTag.id = `${this.#name}-filter`;

    selectTag.append(this.#makeOptionTags());
    return selectTag;
  }

  #makeOptionTags() {
    const fragment = new DocumentFragment();
    this.#optionValues.forEach((option) => {
      const optionTag = document.createElement('option');
      optionTag.value = option;
      optionTag.textContent = option;
      fragment.append(optionTag);
    });
    return fragment;
  }
}

export default SelectBox;

customElements.define('select-box', SelectBox);
