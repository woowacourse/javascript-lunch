const removeHTMLElementByClassName = (className: string) => {
  const invalidMessage = document.getElementsByClassName(className)[0];
  if (invalidMessage) {
    invalidMessage.remove();
  }
};

export default removeHTMLElementByClassName;
