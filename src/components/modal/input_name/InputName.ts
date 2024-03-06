import { inputNameTemplate } from "./template";

function InputName() {
  const render = (form: Element) => {
    form.innerHTML += inputNameTemplate;
  };

  return {
    render,
  };
}

export default InputName;
