import FormFieldContainer from "./FormFieldContainer.js";

const Distance = () => {
  const label = "거리(도보 이동 시간) ";
  const name = "distance";
  const required = true;
  const contents = `<select name="distance" id="distance" required data-testid="distance">
        <option value="">선택해 주세요</option>
        <option value="5">5분 내</option>
        <option value="10">10분 내</option>
        <option value="15">15분 내</option>
        <option value="20">20분 내</option>
        <option value="30">30분 내</option>
      </select>
      `;
  return FormFieldContainer({ contents, required, label, name });
};

export default Distance;
