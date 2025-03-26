import toElement from "../utils/toElement.js";
import append from "../utils/append.js";

function Header(iconButton) {
  const $el = toElement(`
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    </header>`);
  append($el, iconButton);

  return $el;
}

export default Header;
