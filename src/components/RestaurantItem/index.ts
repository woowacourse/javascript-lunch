import { restaurants } from "../../domain/restaurants";
import findImage from "../../tools/findImage";
import IRestaurant from "../../type/IRestaurant";
class RestaurantItem extends HTMLElement {
  restaurant: IRestaurant | undefined;

  constructor() {
    super();
    const id = this.getAttribute("id");
    if (id) {
      this.findRestaurant(id);
      this.restaurant && this.render(this.restaurant);
    }
  }

  render(restaurant: IRestaurant) {
    this.innerHTML = `
    <li class="restaurant">
      <div class="restaurant__category">
        <img
          src="${findImage(restaurant.category)}" 
          alt="${restaurant.category}" 
          class="category-icon"
        >
      </div>
      <div class="restaurant__info w-100">
        <div class="d-flex justify-content-between">
          <div>
            <h3 class="restaurant__name text-subtitle">
              ${restaurant.name}
            </h3>
            <span class="restaurant__distance text-body" >
              캠퍼스부터 ${restaurant.distance}분 내
            </span>
          </div>
          <div>
            <img
              src="${findImage(
                restaurant.favorite ? "favoriteFilled" : "favoriteLined"
              )}" 
              alt="${restaurant.category}" 
              class="category-icon"
            >
          </div>
        </div>
        <p class="restaurant__description text-body">
          ${restaurant.description}
        </p>
      </div>
    </li>
  `;
  }

  findRestaurant(id: string) {
    this.restaurant = restaurants.state.restaurants.find((r) => r.id === id);
  }
}
export default RestaurantItem;
