import toElement from "../utils/toElement.js";

function IconButton({ src, onClick, label }) {
  const $el = toElement(`
    <button type="button" class="gnb__button" aria-label="${label}">
      <img src="${src}" alt="${label}" />
    </button>
  `);

  $el.addEventListener("click", onClick);

  return $el;
}

export default IconButton;
