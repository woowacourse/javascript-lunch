import { DISTANCES } from "../../../constants/constants.js";

const createDistance = () => {
  const addRestaurantForm = document.querySelector(".addRestaurantForm");
  const distance = `
    <div class="form-item form-item--required">
    <label for="distance" class="text-caption"
      >거리(도보 이동 시간)</label>
    <select name="distance" id="distance" required>
      <option value="">선택해 주세요</option>
      ${DISTANCES.map(
        (distance) => `<option value="${distance}">${distance}</option>`
      )}
    </select>
  </div>
  `;

  addRestaurantForm.insertAdjacentHTML("beforeend", distance);
};

export default createDistance;
