const removeErrorMessageById = (invalidId: string) => {
  const invalidMessage = document.getElementById(invalidId);
  if (invalidMessage) {
    invalidMessage.remove();
  }
};

export default removeErrorMessageById;
