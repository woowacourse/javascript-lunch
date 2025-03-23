const render = (
  element: HTMLElement | HTMLElement[],
  container: HTMLElement
) => {
  if (Array.isArray(element)) container.append(...element);
  else if (element instanceof HTMLElement) container.appendChild(element);
};

export default render;
