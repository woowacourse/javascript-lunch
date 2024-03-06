import { selectDistanceTemplate } from "./template";

function SelectDistance() {
  const render = (form: Element) => {
    form.innerHTML += selectDistanceTemplate;
  };

  return {
    render,
  };
}

export default SelectDistance;
