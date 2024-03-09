const removeHTMLElementByClassName = (className: string) => {
  const errorMessageHTMLElement = document.getElementsByClassName(className)[0];
  if (errorMessageHTMLElement) {
    errorMessageHTMLElement.remove();
  }
};

export default removeHTMLElementByClassName;
