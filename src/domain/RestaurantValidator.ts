import Validator from "../Validator";
import { Restaurant } from "../type/restaurant";

const RestaurantValidator = {
  checkAll({ category, name, estimatedTime, link }: Restaurant) {
    this.checkCategory(category);
    this.checkName(name);
    this.checkDistance(estimatedTime);
    this.checkLink(link);
  },

  checkCategory(category: string) {
    if (Validator.isEmptyInput(category))
      throw new Error("카테고리를 선택해 주세요!!");
  },

  checkName(name: string) {
    if (Validator.isEmptyInput(name))
      throw new Error("이름을 입력해 주세요!!");
  },

  checkDistance(distance: string) {
    if (Validator.isEmptyInput(distance))
      throw new Error("거리를 입력해 주세요!!");
  },

  checkLink(link: string) {
    if (Validator.isEmptyInput(link)) return;
    if (!Validator.isCorrectLink(link))
      throw new Error("URL은 선택사항이지만 입력할 때는 올바른 URL을 입력해 주세요!!");
  },
};

export default RestaurantValidator;
