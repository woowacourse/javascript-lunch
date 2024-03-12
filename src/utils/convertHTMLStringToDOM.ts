const convertHTMLStringToDOM = (htmlString: string): DocumentFragment => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const fragment = document.createDocumentFragment();
  doc.body.childNodes.forEach((node) => {
    fragment.appendChild(node);
  });

  return fragment;
};

export default convertHTMLStringToDOM;
