function Header({ TITLE, LABEL }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("gnb");
  headerElement.innerHTML = `
    <h1 class="gnb__title text-title">${TITLE}</h1>
    <button type="button" class="gnb__button" aria-label=${LABEL}>
      <img src="https://aydenote.github.io/javascript-lunch/add-button.png" alt="음식점 추가 모달 활성화 버튼" />
    </button>
    `;
  return headerElement;
}

export default Header;
