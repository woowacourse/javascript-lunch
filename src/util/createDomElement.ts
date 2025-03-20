type Attributes = Record<string, string>;
type Event = Record<string, EventListenerOrEventListenerObject>;

interface DOMElementProps {
  tag: string;
  children?: HTMLElement[];
  attributes?: Attributes;
  event?: Event;
  [key: string]: any;
}

const createDOMElement = ({
  tag,
  children = [],
  attributes = {},
  event = {},
  ...props
}: DOMElementProps): HTMLElement => {
  const element = document.createElement(tag);

  Object.entries(attributes).forEach(([attrName, attrValue]) => {
    element.setAttribute(attrName, attrValue);
  });

  Object.entries(event).forEach(([eventName, eventHandler]) => {
    element.addEventListener(eventName, eventHandler);
  });

  Object.entries(props).forEach(([propName, propValue]) => {
    if (propName in element) {
      (element as any)[propName] = propValue;
    }
  });

  children.forEach((child) => element.appendChild(child));

  return element;
};

export default createDOMElement;
