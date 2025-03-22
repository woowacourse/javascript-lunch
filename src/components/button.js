import createElement from "../utils/createElement";

const Button = (props) => {
  return createElement({
    tag: "button",
    type: props.type,
    id: props.id,
    classList: [...props.class, "text-caption", "button"],
    textContent: props.name,
  });
};

export default Button;
