const convertHTMLStringToDOM = (htmlString: string) => {
  const parser = new DOMParser();
  const document = parser.parseFromString(htmlString, "text/html");
  return document.body.firstChild!;
};

export default convertHTMLStringToDOM;
