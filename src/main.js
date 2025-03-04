const addRestaurantButton = document.querySelector(".gnb__button");
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
