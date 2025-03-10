import { createElement } from "../../../utils/createElement";

const ErrorMessage = (message) => {
  return createElement(/*html*/ `
    <p class="error-message text-caption">
      ${message}
    </p>
  `);
};

export default ErrorMessage;
