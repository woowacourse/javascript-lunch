import { inputDescriptionTemplate } from "./template";

function InputDescription() {
  const render = (form: Element) => {
    form.innerHTML += inputDescriptionTemplate;
  };

  return {
    render,
  };
}

export default InputDescription;
