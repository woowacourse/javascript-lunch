import convertHTMLStringToDOM from "../../utils/convertHTMLStringToDOM";

import tabEventHandler from "./handlers";
import { tabsTemplate } from "./tabsTemplate";

const Tabs = () => {
  document.body.appendChild(convertHTMLStringToDOM(tabsTemplate));

  tabEventHandler();
};
export default Tabs;
