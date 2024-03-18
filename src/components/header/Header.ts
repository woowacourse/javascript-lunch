import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import modalOpenHandler from "./handlers";
import headerTemplate from "./headerTemplate";

function Header() {
  document.body.appendChild(convertHTMLStringToDOM(headerTemplate));

  modalOpenHandler();
}

export default Header;
