const app = document.getElementById("app");

app.insertAdjacentHTML(
  "beforebegin",
  `<header class="gnb">
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="./public/add-button.png" alt="음식점 추가" />
    </button>
  </header>`,
);
