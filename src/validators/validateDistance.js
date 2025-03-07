import toThrowNewError from "./toThrowNewError.js";

const validateDistance = (distance) => {
  toThrowNewError({
    condition: !distance,
    message: "거리(도보 이동 시간)를 선택해주세요.",
  });

  toThrowNewError({
    condition: !["5", "10", "15", "20", "30"].includes(distance),
    message:
      "거리(도보 이동 시간)는 5분, 10분, 15분, 20분, 30분 중 하나여야 합니다.",
  });
};

export default validateDistance;
