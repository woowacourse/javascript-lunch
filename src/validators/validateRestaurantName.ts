import { NAME_LENGTH } from "../components/modal/AddRestaurantModal/RestaurantName.js";
import { Restaurant } from "../entities";
import throwError from "./throwError.js";

const validateRestaurantName = (name: Restaurant["name"]) => {
  throwError({
    condition:
      name.trim().length < NAME_LENGTH.MIN ||
      name.trim().length > NAME_LENGTH.MAX,
    message: `레스토랑 이름을 최소 ${NAME_LENGTH.MIN}글자 ~ 최대 ${NAME_LENGTH.MAX}글자 입력해주세요.`,
  });
};

export default validateRestaurantName;
