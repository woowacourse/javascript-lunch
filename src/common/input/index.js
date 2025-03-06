const Input = (name, required) => {
  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("name", name);
  input.setAttribute("id", name);
  input.setAttribute("required", required);

  return input;
};

export default Input;
