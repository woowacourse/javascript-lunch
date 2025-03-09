import { createElement } from "../../utils/createElement";

const Distance = (minute) => {
  return createElement(/*html*/ `
    <span class="restaurant__distance text-body">${`캠퍼스부터 ${minute}분 내`}</span>
    `);
};

export default Distance;
