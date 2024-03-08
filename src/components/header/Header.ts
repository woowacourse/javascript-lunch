import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import modalOpenHandler from "./handlers";
import headerTemplate from "./template";

function Header() {
  const render = () => {
    document.body.appendChild(convertHTMLStringToDOM(headerTemplate));

    modalOpenHandler();
  };

  render();
}

export default Header;
