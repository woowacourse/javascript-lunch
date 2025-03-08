export function createElement(tag, props = {}) {
  const element = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      Array.isArray(value)
        ? element.classList.add(...value)
        : element.classList.add(value);

      continue;
    }

    element[key] = value;
  }

  return element;
}

export function createElementsFragment(elements) {
  const fragment = document.createDocumentFragment();
  fragment.append(...elements);
  return fragment;
}

export function elementCashController() {
  const cash = new Map();

  function getElement(selector) {
    if (!cash.has(selector)) {
      cash.set(selector, document.querySelector(selector));
    }

    return cash.get(selector);
  }

  return { getElement };
}
