import createElement from "../../utils/createElement/createElement";

const Description = (text, ellipsis) =>
  createElement({
    tagName: "p",
    classNames: [
      "restaurant__description",
      "text-body",
      ellipsis ? "text-ellipsis" : "",
    ],
    text,
  });

export default Description;
