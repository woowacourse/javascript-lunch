import { categoryValue } from "../../data/constants.js";
import Dropdown from "../Dropdown/Dropdown.js";
import Input from "../Input/Input.js";

const distanceValue = {
  5: "5분 내",
  10: "10분 내",
  15: "15분 내",
  20: "20분 내",
  30: "30분 내",
};

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
