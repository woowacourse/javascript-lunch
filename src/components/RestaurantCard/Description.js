import createElement from "../../utils/createElement/createElement";

const Description = (text) =>
  createElement({
    tagName: "p",
    classNames: ["restaurant__description", "text-body"],
    text,
  });

export default Description;
