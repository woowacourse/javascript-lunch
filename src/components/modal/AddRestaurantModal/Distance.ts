import { DISTANCES } from "../../../entities/restaurant.js";
import FormFieldContainer from "./FormFieldContainer.js";

const Distance = () => {
  const contents = /* html */ `
    <select name="distance" id="distance" required data-testid="distance">
      <option value="">선택해 주세요</option>
      ${DISTANCES.map(
        (option) => `<option value="${option}">${option}분 내</option>`
      ).join("")};
    </select>
  `;

  return FormFieldContainer({
    contents,
    required: true,
    label: "거리(도보 이동 시간)",
    name: "distance",
  });
};

export default Distance;
