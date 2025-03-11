import createElement from "../../../utils/createElement/createElement";

const Image = (src, alt, className) =>
  createElement({
    tagName: "img",
    attributes: { src, alt },
    classNames: [className],
  });

export default Image;
