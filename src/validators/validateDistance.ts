import { DISTANCES } from "../components/modal/AddRestaurantModal/Distance.js";
import { Restaurant } from "../entities";
import throwError from "./throwError.js";

const validateDistance = (distance: Restaurant["distance"]) => {
  throwError({
    condition: !distance,
    message: "거리(도보 이동 시간)를 선택해주세요.",
  });

  throwError({
    condition: !DISTANCES.includes(distance),
    message: `거리(도보 이동 시간)는 ${DISTANCES.join(
      "분 내, "
    )}분 내 중 하나여야 합니다.`,
  });
};

export default validateDistance;
