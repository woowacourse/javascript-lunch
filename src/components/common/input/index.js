const Input = (name, required = false) => {
  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("name", name);
  input.setAttribute("id", name);
  input.toggleAttribute("required", required);

  return input;
};

export default Input;
