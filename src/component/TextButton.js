import toElement from "../utils/toElement.js";

function TextButton({ title, onClick, id }) {
  const $textButton = toElement(
    `<button class="text-caption button" id="${id}" type="${
      id === "add__button" ? "submit" : "button"
    }">
      ${title}
    </button>`
  );
  $textButton.addEventListener("click", onClick);

  return $textButton;
}

export default TextButton;
