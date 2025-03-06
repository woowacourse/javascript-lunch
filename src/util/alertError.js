import { Alert } from "../component/Alert.js";

export function alertError(error) {
  if (!document.querySelector(".alert")) {
    document.querySelector("body").appendChild(Alert({ message: error }));
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 1500);
  }
}
