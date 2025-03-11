import { createElement } from "../../../utils/createElement";

const Input = ({ name, required = false }) => {
  return createElement(/*html*/ `
    <input type="text" id=${name} name=${name} ${required ? "required" : ""}/>
  `);
};

export default Input;
