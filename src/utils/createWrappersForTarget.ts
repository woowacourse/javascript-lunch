const createWrappersForTarget = (
  target: HTMLElement,
  quantity: number,
  id: string
): void => {
  const wrapperElements = Array.from({ length: quantity }, (_, i) => {
    const wrapperId = `${id}-${i + 1}`;
    const wrapperElement = document.createElement('div');
    wrapperElement.id = wrapperId;
    return wrapperElement;
  });

  wrapperElements.forEach((wrapperEl) => {
    target.appendChild(wrapperEl);
  });
};

export default createWrappersForTarget;
