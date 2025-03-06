import SelectBox from "../../common/selectBox/SelectBox.js";
import { DISTANCE } from "../../../constants/constants.js";

export default class DistanceSelect {
  render() {
    const $distanceSelect = new SelectBox({
      label: "distance",
      options: DISTANCE,
    }).render();

    return $distanceSelect;
  }
}
