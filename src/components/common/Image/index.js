import createElement from "../../../utils/createElement/createElement";

const Image = ({ src, alt, classNames }) =>
  createElement({
    tagName: "img",
    attributes: { src, alt },
    classNames: classNames,
  });

export default Image;
