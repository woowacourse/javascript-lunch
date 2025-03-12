const Button = (props) => {
  const button = document.createElement("button");
  button.setAttribute("type", props.type);
  button.setAttribute("id", props.id);
  button.classList.add(props.class, "text-caption", "button");
  button.textContent = props.name;

  return button;
};

export default Button;
