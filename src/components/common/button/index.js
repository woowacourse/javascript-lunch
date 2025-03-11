import createElement from "../../../utils/createElement/createElement";

const Button = ({ text, style, onClick, type = "submit", id }) =>
  createElement({
    tagName: "button",
    text: text,
    classNames: ["button", "text-caption", style],
    attributes: { type, id },
    events: { click: onClick },
  });

export default Button;
