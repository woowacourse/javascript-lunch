import { template } from "./template";

function SelectCategory() {
  const render = (form: Element) => {
    form.innerHTML += template;
    console.log("m", form);
  };

  return {
    render,
  };
}

export default SelectCategory;
