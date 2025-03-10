import { categoryValue, distanceValue } from "../../constants/optionValue.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Input from "../Input/Input.js";

const createModalInputs = () => {
  new Dropdown(document.getElementById("category"), categoryValue);
  new Input(document.getElementById("name"), {
    required: "required",
    type: "text",
  });
  new Dropdown(document.getElementById("distance"), distanceValue);
  new Input(document.getElementById("description"), {
    required: "",
    type: "text",
  });
  new Input(document.getElementById("link"), { required: "", type: "url" });
};

export default createModalInputs;
