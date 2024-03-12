import createElementByTag from "../../generateComponent/utils/createElementByTag";

class SubmitButton {
  element: HTMLButtonElement;

  constructor({
    value,
    color = "orange",
    eventListenerArgs = [],
  }: {
    value: string;
    color?: "orange" | "white";
    eventListenerArgs?: EventListenerArg[];
  }) {
    this.element = createElementByTag({
      tag: "button",
      classes: [
        "button",
        "text-caption",
        color === "orange" ? "button--primary" : "button--secondary",
      ],
      contents: value,
    }) as HTMLButtonElement;
    eventListenerArgs.forEach((args) => {
      this.element.addEventListener(...args);
    });
  }
}

export default SubmitButton;
