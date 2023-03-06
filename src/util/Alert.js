const Alert = {
  create(id) {
    const root = document.createElement("div");
    root.setAttribute("class", "alert");
    if (id) root.setAttribute("id", id);

    return root;
  },

  open(element, message) {
    if (!element.classList.contains("alert--open")) {
      element.innerHTML = message;
      element.classList.add("alert--open");
    }
  },

  close(element) {
    if (element.classList.contains("alert--open")) {
      element.classList.remove("alert--open");
    }
  },
};

// class Alert2 {
//   #isOpen;

//   #targetElement;

//   constructor(id) {
//     this.#isOpen = false;
//     this.#targetElement = $(`#${id}`);
//   }

//   show(message) {
//     if (this.#isOpen) return;
//     this.#targetElement.classList.remove("hidden");
//     if (this.#targetElement) this.#targetElement.textContent = message;
//     this.#isOpen = true;
//   }

//   hide() {
//     if (!this.#isOpen) return;
//     this.#targetElement.classList.add("hidden");
//     this.#isOpen = false;
//   }
// };

export default Alert;
