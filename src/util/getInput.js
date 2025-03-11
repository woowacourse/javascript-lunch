export function getInput(name) {
  const value = document.querySelector(`[name=${name}]`).value;
  return value;
}
