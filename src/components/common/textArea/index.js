import createElement from "../../../utils/createElement/createElement";

const TextArea = (name, required = false) => {
  return createElement({
    tagName: "textarea",
    attributes: { type: "text", name, id: name, required },
  });
};

export default TextArea;
