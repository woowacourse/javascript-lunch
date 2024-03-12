const removeHTMLElementByClassName = (className: string) => {
  const targetHTMLElement = document.getElementsByClassName(className)[0];
  if (targetHTMLElement) {
    targetHTMLElement.remove();
  }
};

export default removeHTMLElementByClassName;
