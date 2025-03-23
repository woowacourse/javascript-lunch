const createName = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const nameInput = `
    <div class="form-item form-item--required">
    <label for="name" class="text-caption">이름</label>
    <input type="text" name="name" id="name" required />
    </div>
  `;

  addRestaurantForm.insertAdjacentHTML("beforeend", nameInput);
};

export default createName;
