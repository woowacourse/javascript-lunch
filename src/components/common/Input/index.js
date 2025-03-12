import createElement from "../../../utils/createElement/createElement";

const Input = (name, required = false) =>
  createElement({
    tagName: "input",
    attributes: {
      type: "text",
      name,
      id: name,
      required,
    },
  });

export default Input;
