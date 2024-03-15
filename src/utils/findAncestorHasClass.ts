const findAncestorHasClass = (
  element: HTMLElement,
  className: string
): HTMLElement | null => {
  if (element.classList.contains(className)) return element;
  const parentElement = element.parentElement;
  if (parentElement === null) return null;
  return findAncestorHasClass(parentElement, className);
};

export default findAncestorHasClass;
