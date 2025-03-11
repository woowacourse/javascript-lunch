import createElement from "../../../utils/createElement/createElement";

const TextArea = (name, required = false) =>
  createElement({
    tagName: "textarea",
    attributes: { type: "text", name, id: name, required },
  });

export default TextArea;
