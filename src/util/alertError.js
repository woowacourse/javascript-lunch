import { Alert } from "../component/Alert.js";

export function alertError(func) {
  try {
    console.log(func);
    func();
  } catch (error) {
    const alertContainer = document.querySelector(".alert-container");
    if (!document.querySelector(".alert") && alertContainer) {
      alertContainer.appendChild(Alert({ message: error.message }));
      setTimeout(() => {
        document.querySelector(".alert").remove();
      }, 1500);
    }
    return;
  }
}
