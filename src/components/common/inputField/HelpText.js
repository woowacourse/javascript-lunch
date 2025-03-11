import createElement from "../../../utils/createElement/createElement";

const HelpText = (text) =>
  createElement({
    tagName: "span",
    classNames: ["help-text", "text-caption"],
    text,
  });

export default HelpText;
