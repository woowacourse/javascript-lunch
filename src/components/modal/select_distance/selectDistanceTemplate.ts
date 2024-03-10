import { DISTANCES } from "../../../constants/system";

const selectDistanceTemplate = /*html*/ `
<div class="form-item form-item--required">
  <label for="distance text-caption">거리(도보 이동 시간) </label>
  <select name="distance" id="distance" required>
  <option value="">선택해 주세요</option>
    ${Object.entries(DISTANCES)
      .map(([value, label]) => `<option value="${value}">${label}</option>`)
      .join("\n")}
  </select>
</div>`;

export default selectDistanceTemplate;
