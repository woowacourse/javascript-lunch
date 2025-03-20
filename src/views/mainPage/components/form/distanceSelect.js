import dropDown from "../../../../components/@common/dropDown";
import { DISTANCE_OPTIONS } from "../../../../constants/options";

const distanceSelect = () => {
  return dropDown({
    id: "distance",
    labelText: "거리(도보 이동 시간)",
    options: DISTANCE_OPTIONS,
    isRequired: true,
  });
};

export default distanceSelect;
