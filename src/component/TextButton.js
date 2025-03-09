import toElement from "../utils/toElement.js";

function TextButton({ title, onClick, id }) {
  const buttonStyled = {
    add__button: "button--primary",
    cancel__button: "button--secondary",
  };

  const $textButton = toElement(
    `<button class="text-caption button ${buttonStyled[id]}" id="${id}" type="${
      id === "add__button" ? "submit" : "button"
    }">
      ${title}
    </button>`
  );
  $textButton.addEventListener("click", onClick);

  return $textButton;
}

export default TextButton;
