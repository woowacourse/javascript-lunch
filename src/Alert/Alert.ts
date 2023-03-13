import createAlert from "./UI/createAlert";

class Alert {
  public readonly element: HTMLElement;

  constructor(id: string) {
    this.element = createAlert(id);
    this.element.dataset.open = "false";
  }

  open() {
    if (this.element.dataset.open === "false") {
      this.element.dataset.open = "true";
    }
  }

  close() {
    if (this.element.dataset.open === "true") {
      this.element.innerHTML = "";
      this.element.dataset.open = "false";
    }
  }

  setMessage(message: string) {
    this.element.innerHTML = message;
  }

  eventCallback(event: CustomEvent) {
    if (event.detail) {
      this.setMessage(event.detail.message);
      this.open();
      return;
    }

    this.close();
  }
}

export default Alert;
