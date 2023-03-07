import { CATEGORY, ErrorName } from "@/constant/Restaurant";
import { ErrorMessage } from "@/constant/Message";
import { Category, Restaurant, TakingTime } from "@/type/type";
import restaurantListHandler from "./restaurantListHandler";

class RestaurantValidator {
  validate(restaurant: Restaurant) {
    this.validateCategory(restaurant.category);
    this.validateName(restaurant.category, restaurant.name);
    this.validateTakingTime(restaurant.takingTime);
  }

  private validateName(category: Category, name: string) {
    if (this.isNameEmpty(name)) {
      const nameError = new Error(ErrorMessage.NAME_EMPTY);
      nameError.name = ErrorName.NAME;
      throw nameError;
    }

    if (this.isNameExist(category, name)) {
      const nameError = new Error(ErrorMessage.NAME_EXIST);
      nameError.name = ErrorName.NAME;
      throw nameError;
    }
  }

  private validateTakingTime(takingTime: TakingTime) {
    if (!this.isTakingTimeEmpty(takingTime)) {
      const takingTimeError = new Error(ErrorMessage.TAKING_TIME_EMPTY);
      takingTimeError.name = ErrorName.TAKING_TIME;
      throw takingTimeError;
    }
  }

  private validateCategory(category: Category) {
    if (!this.isCategoryEmpty(category)) {
      const categoryError = new Error(ErrorMessage.CATEGORY_EMPTY);
      categoryError.name = ErrorName.CATEGORY;
      throw categoryError;
    }
  }

  private isNameEmpty(name: string): boolean {
    return !Boolean(name.trim());
  }

  private isNameExist(category: Category, name: string): boolean {
    return restaurantListHandler
      .getFilteredByCategory(category)
      .some((restaurant) => restaurant.name === name);
  }

  private isTakingTimeEmpty(takingTime: TakingTime): boolean {
    return Number.isInteger(takingTime);
  }

  private isCategoryEmpty(category: Category): boolean {
    return CATEGORY.includes(category);
  }
}

export default new RestaurantValidator();
