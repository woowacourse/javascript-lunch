import createElement from "../../util/createElement";
export default function TextArea({ name, id, cols, rows }) {
  const $textarea = createElement({
    tag: "textarea",
    name,
    id,
    cols,
    rows,
  });

  return $textarea;
}
