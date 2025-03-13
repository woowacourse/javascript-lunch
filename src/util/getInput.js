export function getInput(name) {
  const value = document.querySelector(`.form-item [name=${name}]`).value;
  return value;
}
