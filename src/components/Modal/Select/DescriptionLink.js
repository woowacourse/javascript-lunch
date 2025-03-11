const createDescription = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const descriptionInput = `
   <div class="form-item">
      <label for="description" class="text-caption">설명</label>
      <textarea
        name="description"
        id="description"
        cols="30"
        rows="5"
      ></textarea>
      <span class="help-text text-caption">
        메뉴 등 추가 정보를 입력해 주세요.
      </span>
    </div>
  `;

  addRestaurantForm.insertAdjacentHTML("beforeend", descriptionInput);
};

export default createDescription;
