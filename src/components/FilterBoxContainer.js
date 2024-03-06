class FilterBoxContainer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    if (this.isConnected) {
      this.render();
      this.setEvent();
    }
  }

  disconnectedCallback() {
    this.removeEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  setEvent() {}

  removeEvent() {}

  template() {
    return `
      <section class="restaurant-filter-container">
          <filter-box type="category" option="${[
            '전체',
            '한식',
            '중식',
            '일식',
            '아시안',
            '양식',
            '기타',
          ]}"></filter-box>
          <filter-box type="sorting" option="${['이름순', '거리순']}"></filter-box>
      </section>
    `;
  }
}

export default FilterBoxContainer;
