import toElement from "../utils/toElement.js";

function IconButton({ src, onClick, label }) {
  const $button = toElement(`
    <button type="button" class="gnb__button" aria-label="${label}">
      <img src="${src}" alt="${label}" />
    </button>
  `);

  $button.addEventListener("click", onClick);

  return $button;
}

export default IconButton;
