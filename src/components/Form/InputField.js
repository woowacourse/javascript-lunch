function InputField({ inputType, name, required = false }) {
  const inputElement = document.createElement("input");

  inputElement.type = inputType;
  inputElement.name = name;
  inputElement.id = name;
  inputElement.required = required;

  return inputElement;
}

export default InputField;
