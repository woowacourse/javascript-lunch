const ModalContent = (contents) => {
  const modalContent = document.createElement("div");
  modalContent.addEventListener("click", (e) => e.stopPropagation());
  modalContent.classList.add("modal-container");

  contents.forEach((content) => {
    modalContent.appendChild(content);
  });
  return modalContent;
};
export default ModalContent;
