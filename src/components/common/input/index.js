import createElement from "../../../utils/createElement/createElement";

const Input = (name, required = false) => {
  return createElement({
    tagName: "input",
    attributes: {
      type: "text",
      name,
      id: name,
      required,
    },
  });
};

export default Input;
