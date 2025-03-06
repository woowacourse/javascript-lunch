function renderHeader() {
  const headerElement = document.createElement("header");
  headerElement.classList.add("gnb");
  headerElement.innerHTML = `
  <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  <button type="button" class="gnb__button" aria-label="음식점 추가">
    <img src="./public/add-button.png" alt="음식점 추가" />
  </button>
  `;
  return headerElement;
}

function renderContents() {
  const app = document.getElementById("app");
  app.prepend(renderHeader());
}

renderContents();
