import { Alert } from "../component/Alert";

export function alertError(func) {
  try {
    func();
  } catch (error) {
    const alertContainer = document.querySelector(".alert-container");
    const alert = document.querySelector(".alert");
    if (!alert && alertContainer) {
      alertContainer.appendChild(Alert({ message: error.message }));
    }
    setTimeout(() => {
      alert.remove();
    }, 1500);
    return;
  }
}
