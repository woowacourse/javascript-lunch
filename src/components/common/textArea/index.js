import { createElement } from "../../../utils/createElement";

const TextArea = ({ name, required = false }) => {
  return createElement(/*html*/ `
    <textarea type="text" name=${name} id=${name} required=${required}></textarea>
  `);
};

export default TextArea;
