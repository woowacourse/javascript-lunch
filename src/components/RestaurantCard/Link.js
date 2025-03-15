import createElement from "../../utils/createElement/createElement";

const Link = (link) =>
  createElement({
    tagName: "p",
    classNames: ["restaurant__link"],
    text: `${link}`,
  });

export default Link;
