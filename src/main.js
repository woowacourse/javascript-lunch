document.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  body.prepend(header);

  const addRestaurantButton = header.querySelector(".gnb__button");
  const addNewRestaurantModal = document.querySelector("dialog");
  const closeModalButton = document.getElementById("cancel-dialog-btn");

  addRestaurantButton.addEventListener("click", () => {
    addNewRestaurantModal.showModal();
  });

  addNewRestaurantModal.addEventListener("click", (event) => {
    if (event.target === addNewRestaurantModal) {
      addNewRestaurantModal.close();
    }
  });

  closeModalButton.addEventListener("click", () => {
    addNewRestaurantModal.close();
  });
});

const createHeader = ({ title }) => {
  const header = document.createElement("header");

  header.innerHTML = `
      <h1 class="gnb__title text-title">${title}</h1>
      <button type="button" class="gnb__button" aria-label="음식점 추가">
        <img src="../images/add-button.png" alt="음식점 추가" />
      </button>`;
  header.classList.add("gnb");

  return header;
};
