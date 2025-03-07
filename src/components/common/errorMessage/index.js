const ErrorMessage = (message) => {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message", "text-caption");
  errorMessage.textContent = message;

  return errorMessage;
};

export default ErrorMessage;
