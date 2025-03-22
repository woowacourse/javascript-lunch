export const selectElement = (selector: string, ancestor: HTMLElement | Document = document) => {
  const element = ancestor.querySelector(selector);
  if (!element) {
    throw new Error(`${selector}가 존재하지 않습니다.`);
  }

  return element;
};

export const selectElements = (selector: string, ancestor: HTMLElement | Document = document) => {
  const element = ancestor.querySelectorAll(selector);
  if (!element) {
    throw new Error(`${selector}가 존재하지 않습니다.`);
  }

  return element;
};

export const renderElement = (
  selector: string,
  component: HTMLElement | string,
  position: InsertPosition = 'beforeend',
) => {
  const targetElement = selectElement(selector);

  if (component instanceof HTMLElement) {
    targetElement.insertAdjacentElement(position, component);
  } else {
    targetElement.insertAdjacentHTML(position, component);
  }
};

// export const createDOMElement = <K extends keyof HTMLElementTagNameMap>(
//   tagName: K,
//   attributes: Partial<HTMLElementTagNameMap[K]>,
//   children: string[] = [],
// ) => {
//   const element = document.createElement(tagName) as HTMLElement;

//   Object.entries(attributes).forEach(([key, value]) => {
//     element.setAttribute(key, value);
//   });

//   if (children.length > 0) {
//     children.forEach((child) => {
//       element.append(child);
//     });
//   }

//   return element;
// };
