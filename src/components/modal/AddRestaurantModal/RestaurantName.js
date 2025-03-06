const RestaurantName = () => {
  return /*html*/ `
    <div class="form-item form-item--required">
      <label for="name text-caption">이름</label>
      <input type="text" name="name" id="name" required maxlength="15" data-testid="restaurant-name"/>
    </div>
  `;
};

export default RestaurantName;
