const convertHTMLStringToDOM = (htmlString: string) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content;
};

export default convertHTMLStringToDOM;
