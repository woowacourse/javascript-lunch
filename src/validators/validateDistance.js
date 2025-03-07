import toThrowNewError from "./toThrowNewError.js";
import RULES from "../constants/rules.js";

const validateDistance = (distance) => {
  toThrowNewError({
    condition: !distance,
    message: "거리(도보 이동 시간)를 선택해주세요.",
  });

  toThrowNewError({
    condition: !RULES.DISTANCES.includes(parseInt(distance, 10)),
    message:
      "거리(도보 이동 시간)는 5분, 10분, 15분, 20분, 30분 중 하나여야 합니다.",
  });
};

export default validateDistance;
