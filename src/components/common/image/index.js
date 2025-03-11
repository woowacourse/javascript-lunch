import createElement from "../../../utils/createElement/createElement";

const Image = (src, alt, className) => {
  return createElement({
    tagName: "img",
    attributes: { src, alt },
    classNames: [className],
  });
};

export default Image;
