import "../templates/style.css";

import LunchHeader from "./components/LunchHeader";
import Modal from "./components/Modal";
import App from "./App";

customElements.define("lunch-header", LunchHeader, { extends: "header" });
customElements.define("lunch-modal", Modal);

new App();
