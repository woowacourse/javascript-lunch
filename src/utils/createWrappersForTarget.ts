const createWrappersForTarget = (
  target: HTMLElement,
  quantity: number,
  id: string
): void => {
  const wrapperHtml = Array.from({ length: quantity }, (_, i) => {
    const wrapperId = `${id}-${i + 1}`;
    return `<div id="${wrapperId}"></div>`;
  }).join('');
  target.innerHTML = wrapperHtml;
};

export default createWrappersForTarget;
