import IMG_SRC from "../constants/imgSrc";
import createElement from "../utils/createElement";

const Header = (title) => {
  const header = document.querySelector(".header");
  header.innerHTML = `
    <h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src=${IMG_SRC.MODAL_ICON_SRC} alt="음식점 추가" />
    </button>
    `;

  document.querySelector(".gnb__button").addEventListener("click", () => {
    document.querySelector(".modal").classList.add("modal--open");
  });
};

export default Header;
