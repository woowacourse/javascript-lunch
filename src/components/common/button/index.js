const Button = ({ text, style, onClick, type = "submit", id }) => {
  const button = document.createElement("button");

  button.textContent = text;
  button.setAttribute("type", type);
  button.setAttribute("id", id);
  button.classList.add("button", "text-caption");
  button.classList.add(style);

  button.addEventListener("click", onClick);

  return button;
};

export default Button;
