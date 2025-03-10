import { createElement } from "../../../utils/createElement";

const Image = (src, alt, className) => {
  return createElement(/*html*/ `
    <img class="${className}" src=${src} alt=${alt}/>
  `);
};

export default Image;
