export const convertStringToElement = (string) => {
  const div = document.createElement('div');
  div.innerHTML = string;
  return div.firstElementChild;
};
