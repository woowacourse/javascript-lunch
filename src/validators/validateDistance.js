import { RESTAURANT_RULES } from "../constants/rules.js";
import throwError from "./throwError.js";

const validateDistance = (distance) => {
  throwError({
    condition: !distance,
    message: "거리(도보 이동 시간)를 선택해주세요.",
  });

  throwError({
    condition: !RESTAURANT_RULES.DISTANCES.includes(parseInt(distance, 10)),
    message: `거리(도보 이동 시간)는 ${RESTAURANT_RULES.DISTANCES.join(
      "분, "
    )}분 중 하나여야 합니다.`,
  });
};

export default validateDistance;
