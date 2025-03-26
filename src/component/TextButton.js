import toElement from "../utils/toElement.js";

function TextButton({ title, onClick, id }) {
  const $el = toElement(
    `<button class="text-caption button" id="${id}" type="${
      id === "add__button" ? "submit" : "button"
    }">
      ${title}
    </button>`
  );
  $el.addEventListener("click", onClick);

  return $el;
}

export default TextButton;
