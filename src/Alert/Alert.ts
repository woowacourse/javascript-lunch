import createAlert from "./UI/createAlert";

class Alert {
  public readonly element: HTMLElement;

  constructor(id: string) {
    this.element = createAlert(id);
  }

  open() {
    if (!this.element.classList.contains("alert--open")) {
      this.element.classList.add("alert--open");
    }
  }

  close() {
    if (this.element.classList.contains("alert--open")) {
      this.element.innerHTML = "";
      this.element.classList.remove("alert--open");
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
