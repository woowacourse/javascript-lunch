const isHTMLElement = (element: any): element is HTMLElement => {
  return element instanceof HTMLElement;
};

export default isHTMLElement;
