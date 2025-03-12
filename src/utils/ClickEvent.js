import { openModal } from "../components/modal.js";

class ClickEvent {
  constructor(elem) {
    elem.addEventListener("click", this.onClick.bind(this));
  }

  reload() {
    location.reload();
  }

  showStoreAddModal() {
    openModal("storeAdd");
  }

  removeModal(element) {
    if (element.id === "closeModalBtn") {
      document.getElementById("modalBackground")?.classList.remove("show");
      return;
    }
  }

  copyContent(element) {
    const textCopy = element.querySelector("p").textContent;
    if (!textCopy) {
      alert("복사할 내용이 없습니다.");
      return;
    }

    navigator.clipboard
      .writeText(textCopy)
      .then(() => alert("해당 로또 번호가 복사되었습니다."))
      .catch(() => alert("로또 번호 복사에 실패하였습니다."));
  }

  onClick(event) {
    let target = event.target.closest("[data-action]");

    if (!target) return;

    if (
      target.dataset.action &&
      typeof this[target.dataset.action] === "function"
    )
      this[target.dataset.action](target);
  }
}

new ClickEvent(document);
