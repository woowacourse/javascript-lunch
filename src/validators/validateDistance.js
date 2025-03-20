import toThrowNewError from "./toThrowNewError.js";
import RESTAURANT_RULES from "../constants/rules.js";

const validateDistance = (distance) => {
  toThrowNewError({
    condition: !distance,
    message: "거리(도보 이동 시간)를 선택해주세요.",
  });

  toThrowNewError({
    condition: !RESTAURANT_RULES.DISTANCES.includes(
      Number.parseInt(distance, 10)
    ),
    message: `거리(도보 이동 시간)는 ${RESTAURANT_RULES.DISTANCES.map(
      (distance) => `${Number.parseInt(distance, 10)}분`
    ).join(", ")} 중 하나여야 합니다.`,
  });
};

export default validateDistance;
