interface CreateDOMElementProps {
  tag: string;
  children?: (HTMLElement | undefined)[] | HTMLElement;
  [key: string]: any;
}

const createDOMElement = ({ tag, children, ...props }: CreateDOMElementProps): HTMLElement => {
  if (!tag) throw new Error('Tag is required');

  const element = document.createElement(tag);

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'class') {
      if (Array.isArray(value)) {
        value.forEach((className) => {
          element.classList.add(className);
        });
      } else if (typeof value === 'string') {
        value.split(' ').forEach((className) => {
          if (className !== '') element.classList.add(className);
        });
      }
    }

    if (key in element) {
      (element as any)[key] = value;
    } else {
      element.setAttribute(key, value as string);
    }
  });

  if (children) {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (child) element.appendChild(child);
      });
    } else {
      element.appendChild(children);
    }
  }

  return element;
};

export default createDOMElement;
