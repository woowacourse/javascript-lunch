import dropDown from "../components/@common/dropDown";
import { distanceOptions } from "../constants/options";
import { $ } from "../utils/domHelpers";

const distanceSelect = () => {
  const $distanceSelectContainer = $(".distance-select");

  $distanceSelectContainer.innerHTML = `
    ${dropDown({
      id: "distance",
      labelText: "거리(도보 이동 시간)",
      options: distanceOptions,
      isRequired: true,
    })}
  `;

  return $distanceSelectContainer;
};

export default distanceSelect;
