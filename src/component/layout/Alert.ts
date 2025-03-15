import { AlertType } from "../../types/component/LayoutType";

export const Alert = ({ message }: AlertType) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("text-body");
  alert.innerText = message;

  return alert;
};
