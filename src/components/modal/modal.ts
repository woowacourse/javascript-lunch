export const handleModalClose = () => {
  document.querySelector(".modal")?.classList.remove("modal--open");
};

const handleModalCloseEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    handleModalClose();
  }
};

export const handleModalOpen = () => {
  document.querySelector(".modal")?.classList.add("modal--open");
};

const $modal = () => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("modal");

  const background = document.createElement("div");
  background.classList.add("modal-backdrop");
  wrapper.appendChild(background);

  const container = document.createElement("div");
  container.classList.add("modal-container");
  wrapper.appendChild(container);

  document.addEventListener("keydown", handleModalCloseEsc);
  background.addEventListener("click", handleModalClose);

  return wrapper;
};

export default $modal;
