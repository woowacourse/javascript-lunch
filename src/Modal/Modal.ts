// const Modal2 = {
//   create(id) {
//     const modalRoot = document.createElement("div");
//     modalRoot.setAttribute("class", "modal");
//     if (id) modalRoot.setAttribute("id", id);

//     Modal.addBackdrop(modalRoot);
//     Modal.addContainer(modalRoot);

//     return modalRoot;
//   },

//   open(element) {
//     if (!element.classList.contains("modal")) {
//       throw new Error("[ERROR] 주어진 요소가 Modal이 아닙니다.");
//     }

//     if (!element.classList.contains("modal--open")) {
//       element.classList.add("modal--open");
//     }
//   },

//   close(element) {
//     if (!element.classList.contains("modal")) {
//       throw new Error("[ERROR] 주어진 요소가 Modal이 아닙니다.");
//     }

//     if (element.classList.contains("modal--open")) {
//       element.classList.remove("modal--open");
//     }
//   },

//   setInnerHTML(element, string) {
//     if (!element.classList.contains("modal")) {
//       throw new Error("[ERROR] 주어진 요소가 Modal이 아닙니다.");
//     }

//     element.querySelector(".modal-container").innerHTML = string;
//   },

//   setChildElement(element, child) {
//     if (!element.classList.contains("modal")) {
//       throw new Error("[ERROR] 주어진 요소가 Modal이 아닙니다.");
//     }

//     element.querySelector(".modal-container").innerHTML = "";
//     element.querySelector(".modal-container").appendChild(child);
//   },

//   addBackdrop(modalRoot) {
//     const backdrop = document.createElement("div");
//     backdrop.setAttribute("class", "modal-backdrop");

//     backdrop.addEventListener("click", () => Modal.close(modalRoot));
//     document.addEventListener("keyup", (event) => {
//       if (event.key === "Escape" && modalRoot.classList.contains("modal--open")) {
//         Modal.close(modalRoot);
//       }
//     });

//     modalRoot.appendChild(backdrop);
//   },

//   addContainer(modalRoot) {
//     const container = document.createElement("div");
//     container.setAttribute("class", "modal-container");

//     modalRoot.appendChild(container);
//   },
// };

import addCloseModalCallback from "./features/addCloseModalCallback";
import addBackdrop from "./UI/addBackdrop";
import addContainer from "./UI/addContainer";

class Modal {
  public element: HTMLElement;

  constructor(id: string) {
    this.element = document.createElement("div");
    this.element.setAttribute("class", "modal");
    if (id) this.element.setAttribute("id", id);

    addBackdrop(this);
    addContainer(this);
    addCloseModalCallback(this);
  }

  open() {
    if (!this.element.classList.contains("modal--open")) {
      this.element.classList.add("modal--open");
    }
  }

  close() {
    if (this.element.classList.contains("modal--open")) {
      this.element.classList.remove("modal--open");
    }
  }
}

export default Modal;
