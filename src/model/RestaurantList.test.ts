import { ERROR_MESSAGE } from "../settings/settings.ts";
import restaurantList from "./RestaurantList.ts";

describe("RestaurantList test", () => {
  it("should throw error when adding duplicated restaurant", () => {
    const newRestaurant = {
      name: "이태리키친",
      distance: "20",
      description:
        "정통 이탈리안 요리에 창의적인 변화를 더한 모던 다이닝 레스토랑.",
      isFavorite: false,
      category: "양식",
      link: "https://italykitchen.co.kr",
    };
    expect(() => restaurantList.addRestaurant(newRestaurant)).toThrow(
      ERROR_MESSAGE.DUPLICATE_RESTAURANT
    );
  });
});
