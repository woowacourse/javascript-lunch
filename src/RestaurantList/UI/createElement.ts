const createElement = (): HTMLElement => {
  const element = document.createElement("section");
  element.setAttribute("class", "restaurant-list-container");
  return element;
}

export default createElement;
