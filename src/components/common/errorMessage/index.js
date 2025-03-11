import createElement from "../../../utils/createElement/createElement";

const ErrorMessage = (message) => {
  return createElement({
    tagName: "p",
    classNames: ["error-message", "text-caption"],
    text: message,
  });
};

export default ErrorMessage;
