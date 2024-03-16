type AttributeValue = string | number | boolean | (() => void);

function setAttributes(element: Element, attributes: Record<string, AttributeValue>): void {
  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined) {
      element.setAttribute(name, String(value));
    }
  });
}

export default setAttributes;
