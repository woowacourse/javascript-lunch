import { inputLinkTemplate } from "./template";

function InputLink() {
  const render = (form: Element) => {
    form.innerHTML += inputLinkTemplate;
  };

  return {
    render,
  };
}

export default InputLink;
