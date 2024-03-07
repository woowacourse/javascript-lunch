import { headerTemplate } from "./template";
import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";
import { modalOpenHandler } from "./handlers";

function Header() {
  const render = () => {
    document.body.appendChild(convertHTMLStringToDOM(headerTemplate));

    modalOpenHandler();
  };

  render();
}

export default Header;
