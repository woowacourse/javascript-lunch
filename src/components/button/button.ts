import type { Props } from "../../types/type";

interface ButtonProps extends Props<"button"> {}

export default function createButton({
  type,
  textContent,
  className,
  onclick,
}: ButtonProps) {
  return createElement("button", {
    type,
    onclick,
    className,
    textContent,
  });
}
