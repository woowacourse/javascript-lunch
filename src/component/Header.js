
import toElement from "../utils/toElement.js";
import append from "../utils/append.js";

function Header(iconButton) {
  const $header = toElement(`
    <header class="gnb">
      <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
    </header>`);

  append($header, iconButton);

  return $header;
}

export default Header;
