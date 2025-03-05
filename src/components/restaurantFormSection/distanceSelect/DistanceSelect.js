import SelectBox from "../../common/selectBox/SelectBox.js";
import { DISTANCE } from "../../../constants/constants.js";

export default function DistanceSelect() {
  const $distanceSelect = SelectBox({
    label: "distance",
    options: DISTANCE,
  });

  return $distanceSelect;
}
