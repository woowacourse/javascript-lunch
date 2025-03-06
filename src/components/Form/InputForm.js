function InputForm(type, name, required = false) {
  const inputElement = document.createElement("input");

  inputElement.type = type;
  inputElement.name = name;
  inputElement.id = name;
  inputElement.required = required;

  return inputElement;
}

export default InputForm;
