function createInput(inputProps) {
  return renderInput(inputProps);
}

function renderInput({ name, id, type, required }) {
  const input = document.createElement('input');
  input.name = name;
  input.id = id;
  input.type = type;

  if (required) input.setAttribute('required', '');

  return input;
}

export default createInput;
