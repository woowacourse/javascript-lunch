import IMG_SRC from "../constants/imgSrc";

const Header = (title) => {
  return `<h1 class="gnb__title text-title">${title}</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src=${IMG_SRC.MODAL_ICON_SRC} alt="음식점 추가" />
        </button>`;
};

export default Header;
