import { createElement } from "../../../utils/createElement";

const Button = ({ text, style, onClick, type = "submit", id }) => {
  const button = createElement(/*html*/ `
    <button type=${type} id=${id} class="button text-caption ${style}">
      ${text}
    </button>
  `);

  button.addEventListener("click", onClick);

  return button;
};

export default Button;
