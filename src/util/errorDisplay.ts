import { Alert } from "../component/layout/Alert.js";
import { AlertErrorType } from "../types/util/ErrorDisplayType.js";

export function alertError({ error }: AlertErrorType) {
  if (!document.querySelector(".alert")) {
    document.querySelector("body")?.appendChild(Alert({ message: error }));
    setTimeout(() => {
      document.querySelector(".alert")?.remove();
    }, 1500);
  }
}
