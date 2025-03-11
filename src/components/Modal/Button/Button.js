const modalButton = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const modalButton = `
    <div class="button-container">
      <button
        type="button"
        class="button button--secondary text-caption"
        id="cancel-dialog-btn"
      >
        취소하기
      </button>
      <button
        type="submit"
        id="add-restaurant-btn"
        class="button button--primary text-caption"
      >
        추가하기
      </button>
    </div>
  `;

  addRestaurantForm.insertAdjacentHTML("beforeend", modalButton);
};

export default modalButton;
