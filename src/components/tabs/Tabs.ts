import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import clickTabHandler from "./handlers";
import { tabsTemplate } from "./tabsTemplate";

const Tabs = () => {
  document.body.appendChild(convertHTMLStringToDOM(tabsTemplate));

  clickTabHandler();
};
export default Tabs;
