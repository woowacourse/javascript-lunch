export default function createButton({
  type,
  textContent,
  className,
  onclick,
}) {
  return createElement("button", {
    type,
    onclick,
    className,
    textContent,
  });
}
