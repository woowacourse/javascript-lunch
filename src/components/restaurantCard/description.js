import { createElement } from "../../utils/createElement";

const Description = (text, ellipsis) => {
  return createElement(/*html*/ `
    <p class="restaurant__description text-body ${
      ellipsis ? "text-ellipsis" : ""
    }">
      ${text}
    </p>
    `);
};

export default Description;
