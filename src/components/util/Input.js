import createElement from "../../util/createElement";

export default function Input({ type, name, id, isRequired }) {
  const $input = createElement({
    tag: "input",
    type,
    name,
    id,
    required: isRequired,
  });

  return $input;
}
