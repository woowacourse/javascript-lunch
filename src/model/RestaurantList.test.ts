import { ERROR_MESSAGE } from "../settings/errorMessages.ts";
import RestaurantList from "./RestaurantList.ts";

import { INITIAL_RESTAURANT } from "../settings/restaurant.ts";

describe("RestaurantList test", () => {
  it("should throw error when adding duplicated restaurant", () => {
    const newRestaurant = {
      name: "이태리키친",
      distance: 20,
      description:
        "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
      isFavorite: false,
      category: "양식",
      link: "https://italykitchen.co.kr",
    };
    const restaurantList = new RestaurantList([...INITIAL_RESTAURANT]);
    expect(() => restaurantList.addRestaurant(newRestaurant)).toThrow(
      ERROR_MESSAGE.DUPLICATE_RESTAURANT
    );
  });
  it("should successfully add restaurant when adding legit restaurant", () => {
    const newRestaurant = {
      name: "이태리",
      distance: 20,
      description:
        "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
      isFavorite: false,
      category: "양식",
      link: "https://italykitchen.co.kr",
    };
    const restaurantList = new RestaurantList([...INITIAL_RESTAURANT]);
    restaurantList.addRestaurant(newRestaurant);
    expect(restaurantList.List).toEqual([...INITIAL_RESTAURANT, newRestaurant]);
  });
  it("should throw error when delete non-existing restaurant", () => {
    const restaurantList = new RestaurantList([...INITIAL_RESTAURANT]);
    expect(() => restaurantList.deleteRestaurant("친친친")).toThrow(
      ERROR_MESSAGE.NO_RESTAURANT_FOUND
    );
  });
  it("should not throw error when delete existing restaurant", () => {
    const restaurantList = new RestaurantList([...INITIAL_RESTAURANT]);
    expect(() => restaurantList.deleteRestaurant("친친")).not.toThrow(
      ERROR_MESSAGE.NO_RESTAURANT_FOUND
    );
  });
});
