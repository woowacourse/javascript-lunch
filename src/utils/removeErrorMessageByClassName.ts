const removeErrorMessageByClassName = (invalidClassName: string) => {
  const invalidMessage = document.getElementsByClassName(invalidClassName)[0];
  if (invalidMessage) {
    invalidMessage.remove();
  }
};

export default removeErrorMessageByClassName;
