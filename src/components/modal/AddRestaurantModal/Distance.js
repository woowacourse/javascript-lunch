import { RESTAURANT_RULES } from "../../../constants/rules.js";
import FormFieldContainer from "./FormFieldContainer.js";

const Distance = () => {
  const label = "거리(도보 이동 시간)";
  const name = "distance";
  const required = true;

  const contents = /* html */ `
    <select name="distance" id="distance" required data-testid="distance">
      <option value="">선택해 주세요</option>
      ${RESTAURANT_RULES.DISTANCES.map(
        (option) => `<option value="${option}">${option}분 내</option>`
      ).join("")};
    </select>
  `;
  return FormFieldContainer({ contents, required, label, name });
};

export default Distance;
