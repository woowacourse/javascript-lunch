// const options = ['전체', '한식', '중식', '일식', '양식', '아시안', '기타'];

class Dropdown extends HTMLSelectElement {
  // 컴포넌트가 DOM에 추가될 때 실행될 콜백
  connectedCallback() {
    console.log('Component added to DOM');
    // this.addOptions();
  }

  addOptions(options) {
    options.forEach((option) => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      this.appendChild(optionElement);
    });
  }
}

export default Dropdown;
