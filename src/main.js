import IconButton from "./component/IconButton/IconButton.js";
import AddLunchModal from "./component/AddLunchModal/AddLunchModal.js";
import { DOM } from "./utils/dom.js";
import TextButton from "./component/TextButton/TextButton.js";

IconButton.init(AddLunchModal.open, DOM.$gnbButton);
TextButton.init(AddLunchModal.close, DOM.$cancelButton);
